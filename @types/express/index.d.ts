//todo:: ts error Property 'firstName' does not exist on type 'User'. Property 'firstName' does not exist on type 'User'.
// declare global{
//     namespace Express {
//         interface Request {
//             user: {
//                 googleID: string;
//                 displayName: string;
//                 firstName: string;
//                 lastName: string;
//                 image: string;
//             }
//         }
//     }
// }

declare namespace Express {
    export interface Request {
        user: {
            googleID: string;
            displayName: string;
            firstName: string;
            lastName: string;
            image: string;
        }
    }
}