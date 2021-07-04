declare global{
    namespace Express {
        interface Request {
            user: {
                googleID: string;
                displayName: string;
                firstName: string;
                lastName: string;
                image: string;
            }
        }
    }
}