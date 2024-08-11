import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { signToken } from './jwt';

const prisma = new PrismaClient();

export const getFlashcards = async (req: Request, res: Response) => {
    try {
        const flashcards = await prisma.flashcard.findMany();
        res.json(flashcards);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export const addFlashcard = async (req: Request, res: Response) => {
    const { question, answer } = req.body;
    try {
        const flashcard = await prisma.flashcard.create({
            data: {
                question,
                answer,
            },
        });
        res.json({
            message: 'Flashcard added successfully',
            flashcard,
        });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export const updateFlashcard = async (req: Request, res: Response) => {
    const { question, answer,id } = req.body;
    try {
        const flashcard = await prisma.flashcard.update({
            where: {
                id: parseInt(id),
            },
            data: {
                question,
                answer,
            },
        });
        res.json({
            message: 'Flashcard updated successfully',
            flashcard,
        });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export const deleteFlashcard = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        await prisma.flashcard.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.json({ message: 'Flashcard deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    if (username === 'admin' && password === 'admin') {
        const token = signToken({ role: 'admin' });
        res.status(200).json({ message: 'Login successful', token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
};
