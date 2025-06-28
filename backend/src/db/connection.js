import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    console.log('📊 Database URI:', process.env.MONGO_URI);
    
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log('🏠 Database Name:', mongoose.connection.db.databaseName);
    console.log('🔌 Connection State:', mongoose.connection.readyState);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Available Collections:', collections.map(c => c.name));
    
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;