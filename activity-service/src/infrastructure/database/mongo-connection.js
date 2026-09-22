import mongoose from 'mongoose';
export const connectMongo = (uri) => mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
