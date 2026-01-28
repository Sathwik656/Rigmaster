import { connectDb, disconnectDb } from './src/config/db.config.js';
import * as authService from './src/services/auth.service.js';
import { User } from './src/models/User.model.js';

async function main() {
    try {
        console.log('Connecting to DB...');
        await connectDb();
        console.log('Connected.');

        const email = 'admin@rigmaster.com';
        const password = 'admin'; // Assuming this is the password being tried

        console.log(`Checking user: ${email}`);
        const user = await User.findOne({ email }).select('+passwordHash');

        if (!user) {
            console.error('User NOT FOUND in DB');
        } else {
            const userInfo = JSON.stringify({
                id: user._id,
                role: user.role,
                active: user.isActive,
                passwordHash: user.passwordHash
            }, null, 2);

            const fs = await import('fs');
            fs.writeFileSync('user_info.txt', userInfo);
            console.log('Written user info to user_info.txt');

            console.log('Attempting login service...');
            try {
                const result = await authService.login({ email, password });
                console.log('Login SUCCESS:', result);
            } catch (err) {
                console.error('Login FAILED (caught in service call):');
                console.error(err);
                if (err.stack) console.error(err.stack);
            }
        }

    } catch (err) {
        console.error('Global script error:', err);
    } finally {
        await disconnectDb();
    }
}

main();
