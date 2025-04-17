import { Inngest } from "inngest";
import connectToDB from "./db";
import User from "@/models/user.models";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "star-boutique" });

// save user data to DB
export const syncUserCreation = inngest.createFunction(
    {  id: 'sync-user-from-clerk' },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`,
            imageUrl: image_url
        }
        await connectToDB();
        await User.create(userData);
    }
);

//update user
export const syncUserUpdating = inngest.createFunction(
    { id: 'update-user-from-clerk' },
    { event: 'clerk/user.updated' },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`,
            imageUrl: image_url
        }
        await connectToDB();
        await User.findByIdAndUpdate(id, userData);
    }
);

// delete user
export const syncDeleteUser = inngest.createFunction(
    { id: 'delete-user-with-clerk' },
    { event: 'clerk/user.deleted' },
    async ({ event }) => {
        const { id } = event.data;

        await connectToDB();
        await User.findByIdAndDelete(id)
    }
)