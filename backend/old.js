// // const express = require('express');
// // const mongoose = require('mongoose');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');

// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // // Middleware
// // app.use(cors());
// // app.use(bodyParser.json());

// // // Connect to MongoDB
// // mongoose.connect("mongodb+srv://youssef:youssef8444@cluster0.rq1nn.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0",
// //  { useNewUrlParser: true, useUnifiedTopology: true })
// //   .then(() => console.log('MongoDB connected'))
// //   .catch(err => console.error(err));

// // // Define a schema and model
// // const projectSchema = new mongoose.Schema({
// //   name: String,
// //   description: String,
// //   githubUrl: String,
// //   imageUrl: String,
// // });

// // const Project = mongoose.model('Project', projectSchema);

// // // الحصول على جميع المشاريع

// // app.get('/api/projects', async (req, res) => {
// //   try {
// //       const projects = await Project.find();
// //       res.json(projects);
// //   } catch (error) {
// //       console.error(error);
// //       res.status(500).send('Server Error');
// //   }
// // });

// // app.get('/', (req, res) => {
// //   res.send('Hello World');
// // });
// // // بدء الخادم
// // app.listen(PORT, () => {
// //   console.log(`Server is running on http://localhost:${PORT}`);
// //   console.log('Visit http://localhost:3000/ to see the message');
// // });

// // // // تحديث مشروع
// // // app.put('/projects/:id', async (req, res) => {
// // //   await Project.findByIdAndUpdate(req.params.id, req.body);
// // //   res.sendStatus(200);
// // // });

// // // // حذف مشروع
// // // app.delete('/projects/:id', async (req, res) => {
// // //   await Project.findByIdAndDelete(req.params.id);
// // //   res.sendStatus(200);
// // // });
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');  // Import cors

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());

// // Enable CORS for specific origin (localhost:4200 for Angular app)
// app.use(cors({ origin: 'http://localhost:4200' }));

// // Connect to MongoDB
// mongoose.connect("mongodb+srv://youssef:youssef8444@cluster0.rq1nn.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0");

// // Define your Project schema and model
// const projectSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   githubUrl: String,
//   imageUrl: String,
// });

// const Project = mongoose.model('Project', projectSchema);

// // POST endpoint to add a project
// app.post('/api/projects', async (req, res) => {
//   try {
//     const project = new Project(req.body);
//     await project.save();
//     res.status(201).send(project);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // GET endpoint to retrieve projects
// app.get('/api/projects', async (req, res) => {
//   try {
//     const projects = await Project.find();
//     res.status(200).send(projects);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // PUT endpoint لتحديث المشروع
// app.put('/api/projects/:id', async (req, res) => {
//   try {
//     const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!project) {
//       return res.status(404).send();
//     }
//     res.send(project);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // DELETE endpoint لحذف المشروع
// app.delete('/api/projects/:id', async (req, res) => {
//   try {
//     const project = await Project.findByIdAndDelete(req.params.id);
//     if (!project) {
//       return res.status(404).send();
//     }
//     res.send(project);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
// //////////////////////////////////// SKiLLS
// const skillSchema = new mongoose.Schema({
//   name: String,
// });

// const Skill = mongoose.model('Skill', skillSchema);

// // POST endpoint to add a project
// app.post('/api/skills', async (req, res) => {
//   try {
//     const skill = new Skill(req.body);
//     await skill.save();
//     res.status(201).send(skill);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // GET endpoint to retrieve projects
// app.get('/api/skills', async (req, res) => {
//   try {
//     const skills = await Skill.find();
//     res.status(200).send(skills);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // PUT endpoint لتحديث المشروع
// app.put('/api/skills/:id', async (req, res) => {
//   try {
//     const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!skill) {
//       return res.status(404).send();
//     }
//     res.send(skill);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // DELETE endpoint لحذف المشروع
// app.delete('/api/skills/:id', async (req, res) => {
//   try {
//     const skill = await Skill.findByIdAndDelete(req.params.id);
//     if (!skill) {
//       return res.status(404).send();
//     }
//     res.send(skill);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
// // app.delete('/api/skills/:id', async (req, res) => {
// //   try {
// //     const skill = await Skill.findByIdAndDelete(req.params.id);
// //     if (!skill) {
// //       return res.status(404).send({ message: 'Skill not found' });
// //     }
// //     res.status(200).send({ message: 'Skill deleted successfully' });
// //   } catch (error) {
// //     console.error('Error deleting skill:', error);
// //     res.status(500).send({ message: 'Internal Server Error' });
// //   }
// // });

// //////////////////////////////////// register

// const bcrypt = require('bcryptjs');

// // User Schema
// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// const User = mongoose.model('User', UserSchema);

// // Register route
// app.post('/api/register', async (req, res) => {
//   const { username, password } = req.body;

//   // Check if user already exists
//   const existingUser = await User.findOne({ username });
//   if (existingUser) {
//     return res.status(400).json({ message: 'User already exists' });
//   }

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Save the user
//   const newUser = new User({ username, password: hashedPassword });
//   await newUser.save();

//   res.json({ message: 'User registered successfully' });
// });

// //////////////////////////////////// Login
// // Login route
// app.post('/api/login', async (req, res) => {
//     const { username, password } = req.body;
  
//     // Check if user exists
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid username or password' });
//     }
  
//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid username or password' });
//     }
  
//     res.json({ message: 'Login successful' });
//   });
// ////////////////////////////////////
// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
