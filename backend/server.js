
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Enable CORS for specific origin (localhost:4200 for Angular app)
app.use(cors({ origin: 'http://localhost:4200' }));

// Connect to MongoDB
mongoose.connect("  ", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Define your Project schema and model
const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  githubUrl: String,
  imageUrl: String,
});

const Project = mongoose.model('Project', projectSchema);

// POST endpoint to add a project
app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET endpoint to retrieve projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT endpoint لتحديث المشروع
app.put('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      return res.status(404).send();
    }
    res.send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE endpoint لحذف المشروع
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).send();
    }
    res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
});
//////////////////////////////////// SKiLLS
const skillSchema = new mongoose.Schema({
  name: String,
});

const Skill = mongoose.model('Skill', skillSchema);

// POST endpoint to add a project
app.post('/api/skills', async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).send(skill);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET endpoint to retrieve projects
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).send(skills);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT endpoint لتحديث المشروع
app.put('/api/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) {
      return res.status(404).send();
    }
    res.send(skill);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE endpoint لحذف المشروع
app.delete('/api/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).send();
    }
    res.send(skill);
  } catch (error) {
    res.status(500).send(error);
  }
});
// app.delete('/api/skills/:id', async (req, res) => {
//   try {
//     const skill = await Skill.findByIdAndDelete(req.params.id);
//     if (!skill) {
//       return res.status(404).send({ message: 'Skill not found' });
//     }
//     res.status(200).send({ message: 'Skill deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting skill:', error);
//     res.status(500).send({ message: 'Internal Server Error' });
//   }
// });

//////////////////////////////////// register

const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Register route
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.json({ message: 'User registered successfully' });
});

//////////////////////////////////// Login
// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid username or password' });
    }

    // تخزين بيانات المستخدم
    res.json({ success: true, message: 'Login successful', token: 'your-token', user: { username: user.username } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
//////////////////////////////////// review
app.use(express.json());

const reviewSchema = new mongoose.Schema({
  rate: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // إضافة حقل createdAt
});

// إنشاء النموذج
const Review = mongoose.model('Review', reviewSchema);
app.post('/api/reviews', async (req, res) => {
  try {
    const review = new Review(req.body); // إنشاء كائن جديد من Review
    await review.save(); // حفظ المراجعة

    console.log('Review saved:', review); // طباعة المراجعة في الكونسول
    res.status(201).send(review); // إرسال المراجعة كاستجابة
  } catch (error) {
    console.error('Error:', error); // طباعة الخطأ إذا حدث
    res.status(400).send(error); // إرسال حالة الخطأ
  }
});



app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send(error);
  }
});

// const reviewSchema = new mongoose.Schema({
//   rating: { type: Number, required: true },
//   comment: { type: String, required: true }
// });

// const Review = mongoose.model('Review', reviewSchema);

// app.post('/api/reviews', (req, res) => {
//   console.log('Received review data:', req.body); // للتحقق من البيانات المرسلة
//   const { rating, comment } = req.body;

//   const newReview = new Review({ rating, comment });
  
//   newReview.save()
//     .then(savedReview => {
//       console.log('Review saved successfully:', savedReview);
//       res.status(201).json({ message: 'تم حفظ التقييم بنجاح', review: savedReview });
//     })
//     .catch(error => {
//       console.error('Error saving review:', error);
//       res.status(500).json({ message: 'حدث خطأ أثناء حفظ التقييم', error });
//     });
// });

// Endpoint to get reviews
// app.get('/api/reviews', (req, res) => {
//   Review.find()
//     .then((reviews) => res.json(reviews))
//     .catch((error) => {
//       console.error('Error fetching reviews:', error);
//       res.status(500).json({ message: 'Error fetching reviews' });
//     });
// });

////////////////////////////////////
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
