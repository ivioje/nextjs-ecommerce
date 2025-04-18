import { Inngest } from "inngest";
import connectToDB from "./db";
import User from "@/models/user.model";
import Order from "@/models/order.model";

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
export const syncUserUpdation = inngest.createFunction(
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
export const syncUserDeletion = inngest.createFunction(
    { id: 'delete-user-with-clerk' },
    { event: 'clerk/user.deleted' },
    async ({ event }) => {
        const { id } = event.data;

        await connectToDB();
        await User.findByIdAndDelete(id)
    }
);

// create user order in db
export const createUserOrder = inngest.createFunction(
    { 
        id: 'create-user-order',
        batchEvents: {
            maxSize: 5,
            timeout: '5s'
        }
    },
    {event: 'order/created'},
    async ({events}) => {
        const orders = events.map((event) => {
            return {
                userId: event.data.userId,
                items: event.data.items,
                amount: event.data.amount,
                address: event.data.address,
                date: event.data.date
            }
        })

        await connectToDB();
        await Order.insertMany(orders)

        return { success: true, processed: orders.length }
    }
)