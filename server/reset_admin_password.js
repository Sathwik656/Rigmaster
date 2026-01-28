import { connectDb, disconnectDb } from './src/config/db.config.js';
import { User } from './src/models/User.model.js';
import bcrypt from 'bcryptjs';

async function main() {
    try {
        console.log('Connecting to DB...');
        await connectDb();
        console.log('Connected.');

        const email = 'admin@rigmaster.com';
        const newPassword = 'admin';

        console.log(`Resetting password for: ${email}`);

        const hash = await bcrypt.hash(newPassword, 12);

        const result = await User.updateOne(
            { email },
            { $set: { passwordHash: hash } }
        );

        if (result.matchedCount === 0) {
            console.error('User not found!');
        } else {
            console.log('Password updated successfully.');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await disconnectDb();
    }
}

main();
