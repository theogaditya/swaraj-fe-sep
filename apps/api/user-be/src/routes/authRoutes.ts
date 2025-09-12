
import { Router, Request, Response } from 'express';import { PrismaClient } from "@repo/db";import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { signupSchema, signinSchema } from '../schemas/authSchema';
import { z } from 'zod';
import { sendWelcomeEmail } from '../utils/mailer';

const router = Router();
const prisma = new PrismaClient();

// Signup route
router.post('/signup', async (req, res: any) => {
  try {
    const { 
      email, 
      phoneNumber, 
      name, 
      password, 
      dateOfBirth,
      aadhaarId, 
      preferredLanguage, 
      disability,
      location
    } = signupSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { phoneNumber }] },
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email or phone number already in use' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with location in a transaction
    const result = await prisma.$transaction(async (tx: any) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email,
          phoneNumber,
          name,
          password: hashedPassword,
          dateOfBirth: new Date(dateOfBirth),
          aadhaarId,
          preferredLanguage: preferredLanguage || "English",
          disability: disability || "None",
        },
      });

      // Create user location if provided
      let userLocation = null;
      if (location) {
        userLocation = await tx.userLocation.create({
          data: {
            userId: user.id,
            pin: location.pin,
            district: location.district,
            city: location.city,
            locality: location.locality,
            street: location.street,
            municipal: location.municipal,
          },
        });
      }

      sendWelcomeEmail(email, name).catch(console.error);

      return { user, userLocation };
    });

    // Generate JWT
    const token = jwt.sign(
      { id: result.user.id }, 
      process.env.JWT_SECRET!, 
      { expiresIn: '7d' }
    );
    
    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
    
    return res.status(201).json({ 
      message: 'User created', 
      user: { 
        id: result.user.id, 
        email, 
        name, 
        dateOfBirth: result.user.dateOfBirth,
        aadhaarId: result.user.aadhaarId,
        preferredLanguage: result.user.preferredLanguage,
        disability: result.user.disability,
        location: result.userLocation
      } 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: 'Server error' });
  }
});

// --- Signin route (replace your current /signin handler with this) ---
router.post('/signin', async (req, res: any) => {
  try {
    const { email, password } = signinSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    // Cookie options: use 'none' in production (for cross-site cookies),
    // but keep sensible defaults in development to avoid strict secure requirements on localhost.
    const cookieOptions: any = {
      httpOnly: true,
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: process.env.NODE_ENV === 'production',
      // In production, set SameSite=None so the cookie will be sent on cross-site requests
      // (requires `secure: true` on modern browsers). For local dev we keep 'lax' to avoid rejection.
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    };

    res.cookie('token', token, cookieOptions);

    // Also return token in JSON as a fallback for clients that cannot store the cookie
    // (e.g., development or strict cross-site contexts). The cookie is still httpOnly.
    res.json({
      message: 'Signed in',
      user: { id: user.id, email: user.email, name: user.name },
      token, // fallback - frontend may choose to store this (e.g., localStorage) as Authorization Bearer
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: 'Server error' });
  }
});

// --- Logout route (clear cookie using same options) ---
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  res.json({ message: 'Logged out' });
});


router.get('/status', async (req, res:any) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ loggedIn: false });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true },
    });

    if (!user) {
      return res.json({ loggedIn: false });
    }

    res.json({ loggedIn: true, user });
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.json({ loggedIn: false });
  }
});

export default router;