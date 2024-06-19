import express from "express";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Auth from "../middleware/auth.js";
import validator from "validator";
import fs from "fs";
import csv from "fast-csv";
import Gtts from "gtts";
import path from "path";
const router = express.Router();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// sign up
router.post("/user/signup", async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password)
    return res.status(404).send({
      msg: "Please fill all the fields",
    });

  try {
    if (!validator.isEmail(email)) {
      res.status(400).send({ msg: "Please enter a valid email format!!" });
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).send({ msg: "This email is already exist!!" });
    }
    const checkUsername = await User.findOne({ username });
    if (checkUsername) {
      return res.status(400).send({ msg: "This username is already exist!!" });
    }
    if (password.length < 7) {
      return res
        .status(401)
        .send({ msg: "Password must be at least 7 characters long" });
    }
    const user = new User(req.body);
    await user.save();

    const token = await user.generateAuthToken();

    // res.setHeader("Authorization", `Bearer ${token}`);
    res
      .status(200)
      .send({ msg: "Signed up Successfully", token: `Bearer ${token}` });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: `error just occured : ${e}` });
  }
});

// signin
router.post("/user/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(404).send({ msg: "Please fill all the fields" });

  try {
    if (!validator.isEmail(email)) {
      res.status(400).send({ msg: "Please enter a valid email format!!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "This email is not existing !!" });
    }
    if (user.password !== password) {
      return res.status(400).send({ msg: "The password is not correct!!" });
    }
    const token = await user.generateAuthToken();
    // res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).send({
      msg: "Signed in Successfully",
      token: `Bearer ${token}`,
      userData: { username: user.username, email: user.email },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: `error just occured : ${e}` });
  }
});

//signout
router.post("/user/signout", Auth, async (req, res) => {
  try {
    req.user.token = "";
    await req.user.save();
    res.status(200).send({ msg: "signed out successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: `error just occured : ${e}` });
  }
});

// send feedback
router.post("/user/feedback", Auth, async (req, res) => {
  const feedback = req.body.feedback;
  if (!feedback) {
    return res.status(404).send({ msg: "Please fill the feedback field" });
  }

  try {
    const username = req.user.username;
    const receivedFeedback = { username, feedback };

    const admin = await Admin.findOne({ email: "admin@gmail.com" });
    admin.feedbacks.push(receivedFeedback);

    await admin.save();
    res.status(200).send({ msg: "Feedback sent successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: `error just occured : ${e}` });
  }
});

const originalStoriesMale = [
  {
    title: "{name}'s {hobby} Dream",
    description:
      "{name}, whose favorite color was {color}, was passionate about {hobby}. His hobby was {hobby}. Dylan organized a {hobby} in his backyard, inviting his friends to join him in a percussion-filled evening under the starry sky",
  },
  {
    title: "{name} the Blueberry Explorer",
    description:
      "In a quaint village, there lived a boy named {name} who adored the color {color} . His room was filled with {color} toys and paintings. {name}'s favorite hobby was {hobby}. One day, he found a magical blueberry bush. Eating the blueberries gave him the energy to explore even more and share his exciting discoveries with his friends.",
  },
  {
    title: "{name} the {sport}",
    description:
      "{name}, a brave and adventurous boy, loved the color {color} and dreamed of {sport}. His room was adorned with {color} posters of towering peaks. {name}'s favorite sport was {sport}, and he spent weekends {sport}. His courage and determination inspired others to reach for their dreams, just like {sport}",
  },
  {
    title: "{name}'s {color} Adventure",
    description:
      "Meet {name}, a boy whose favorite color was {color}. {name} loved spending his weekends at the beach, collecting seashells and building sandcastles. His hobby was {hobby}, and he could {sport}. One day, {name} discovered a mysterious {color} treasure chest washed ashore, sparking an underwater adventure",
  },
];

const originalStoriesFemale = [
  {
    title: "{name}'s {color} Garden",
    description:
      "{name}, whose favorite color was {color}, loved to spend her afternoons in her magical garden. She planted flowers of every hue and chatted with her friends, the butterflies. One day, they organized a {color}-themed tea party, where {name}'s colorful garden became the perfect backdrop for a joyful gathering",
  },
  {
    title: "{name}'s {hobby} Adventures",
    description:
      "{name}, with a passion for {hobby}, carried her vibrant palette everywhere. Her favorite color was {color}, and she loved to play {sport}. {name} invited her friends to join an {hobby} club, where they explored different colors and crafted imaginative stories behind their {hobby}",
  },
  {
    title: "{name}'s Gymnastics Gala",
    description:
      "{name}, with a passion for the color {color}, excelled in gymnastics. Her hobby was {hobby}. {name} organized a gymnastics showcase for her friends, showcasing their flexibility and strength in a dazzling gala filled with cartwheels and somersaults",
  },
  {
    title: "{name}'s Starry Science Club",
    description:
      "{name}, whose favorite color was {color}, had a passion for {sport}. Her hobby was {hobby}. {name} started a science club with her friends, where they explored the mysteries of the cosmos and even built their own miniature rockets.",
  },
];
router.post("/generate-stories-english", async (req, res) => {
  const audioDir = path.join(__dirname, "audio");

  const { gender, inputs } = req.body;

  try {
    let originalStories =
      gender === "M" ? originalStoriesMale : originalStoriesFemale;

    const modifiedStories = originalStories.map((story, i) => {
      const name = inputs.name;
      const sport = inputs.sport;
      const hobby = inputs.hobby;
      const color = inputs.color;

      const title = story.title
        .replace(/{name}/g, name)
        .replace(/{color}/g, color)
        .replace(/{hobby}/g, hobby)
        .replace(/{sport}/g, sport);
      const description = story.description
        .replace(/{name}/g, name)
        .replace(/{color}/g, color)
        .replace(/{hobby}/g, hobby)
        .replace(/{sport}/g, sport);

      return {
        title,
        description,
        filename: `story${i + 1}.mp3`,
      };
    });

    // Save stories to CSV
    const csvStream = csv.format({ headers: true });
    const writableStream = fs.createWriteStream("./Stories_Data_English.csv");
    csvStream.pipe(writableStream);
    modifiedStories.forEach((story) => csvStream.write(story));
    csvStream.end();

    // Promisify the finish event of the writableStream
    await new Promise((resolve, reject) => {
      writableStream.on("finish", resolve);
      writableStream.on("error", reject);
    });

    // Generate audio files after CSV is written
    const audios = await Promise.all(
      modifiedStories.map((story) => {
        const title = story.title;
        const description = story.description;
        const filename = path.join(audioDir, story.filename);
        const storyText = `${title}. ${description}`;
        const gtts = new Gtts(storyText, "en");
        return new Promise((resolve, reject) => {
          // store gtts result in an object not a file
          let capturedOutput = Buffer.from("");
          gtts
            .stream()
            .on("data", function (chunk) {
              capturedOutput = Buffer.concat([capturedOutput, chunk]);
            })
            .on("end", function () {
              const base64Output = capturedOutput.toString("base64");
              resolve(base64Output);
            });
        });
      })
    );

    const stories = modifiedStories.map((s, i) => {
      return {
        title: s.title,
        description: s.description,
        audio: audios[i],
      };
    });

    res.json({
      msg: "Stories generated with titles, descriptions, and audio files",
      stories,
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "An error occurred while generating stories." });
  }
});

export default router;
