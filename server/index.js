const express = require("express");
const app = express();
var jwt = require("jsonwebtoken");
const { auth } = require("./middleware");
let USER_ID_COUNTER = 1;
const USERS = [];
const JWT_SECRET = "secret";
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");
app.use(cors());
app.use(jsonParser);
const PROBLEMS = [
    {
        problemId: "1",
        title: "201. Bitwise AND of Numbers Range",
        difficulty: "Medium",
        acceptance: "42%",
        description: "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
        exampleIn: "left = 5, right = 7",
        exampleOut: "4"
    },
    {
        problemId: "2",
        title: "205. Add two numbers",
        difficulty: "Medium",
        acceptance: "41%",
        description: "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
        exampleIn: "a = 100 , b = 200",
        exampleOut: "300"
    },
    {
        problemId: "3",
        title: "202. Happy Number",
        difficulty: "Easy",
        acceptance: "54.9%",
        description: "Write an algorithm to determine if a number n is happy.",
        exampleIn: "n = 19",
        exampleOut: "true"
    },
    {
        problemId: "4",
        title: "203. Remove Linked List Elements",
        difficulty: "Hard",
        acceptance: "42%",
        description: "Given number k , removed kth element",
        exampleIn: "list: 1->2->3 , k=2",
        exampleOut: "1->3"
    },
    {
        problemId: "1",
        title: "201. Bitwise AND of Numbers Range",
        difficulty: "Medium",
        acceptance: "42%",
        description: "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
        exampleIn: "left = 5, right = 7",
        exampleOut: "4"
    },
    {
        problemId: "2",
        title: "205. Add two numbers",
        difficulty: "Medium",
        acceptance: "41%",
        description: "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
        exampleIn: "a = 100 , b = 200",
        exampleOut: "300"
    },
    {
        problemId: "3",
        title: "202. Happy Number",
        difficulty: "Easy",
        acceptance: "54.9%",
        description: "Write an algorithm to determine if a number n is happy.",
        exampleIn: "n = 19",
        exampleOut: "true"
    },
    {
        problemId: "4",
        title: "203. Remove Linked List Elements",
        difficulty: "Hard",
        acceptance: "42%",
        description: "Given number k , removed kth element",
        exampleIn: "list: 1->2->3 , k=2",
        exampleOut: "1->3"
    }
];

app.get("/", (req, res) => {
    res.send("hello world")
})

app.get("/problems", (req, res) => {
    const filteredProblems = PROBLEMS.map(x => ({
        problemId: x.problemId,
        difficulty: x.difficulty,
        acceptance: x.acceptance
    }))
    res.json({
        problem: filteredProblems
    })
})

app.get("/me", auth, (req, res) => {
    const user = USERS.find((x) => x.id === req.userId);
    res.json({ email: user.email, id: user.id });
});

app.get("/submissions/:problemId", auth, (req, res) => {
    const problemId = req.params.problemId;
    const submissions = SUBMISSIONS.filter(
        (x) => x.problemId === problemId && x.userId === req.userId
    );
    res.json({
        submissions,
    });
});

app.get("/problems/:id", (req, res) => {
    id = req.params.id
    const problem = PROBLEMS.find(x => x.id === id)
    if (!problem) {
        return res.status(411).json({})
    }
    res.json({
        problem: problem
    })
})

app.post("/signup", () => {
    const email = req.body.email
    const password = req.body.password

    if (USERS.find(x => x.email === email)) {
        return res.status(403).json({
            msg: "user already exists"
        })
    }

    USERS.push({
        email,
        password,
        id: USER_ID_COUNTER++
    })

    return res.json({
        msg: "success"
    })

})

app.post("/login", () => {
    email = req.body.email
    password = req.body.password

    user = USERS.find(x => x.email === email)
    if (!user) {
        return res.status(403).json({
            msg: "user not found"
        })
    }

    if (user.password !== password) {
        return res.status(403).json({
            msg: "wrong password"
        })
    }

    const token = jwt.sign({
        id: user.id
    }, JWT_SECRET)

    return res.json({ token })

})

app.listen(3000, () => {
    console.log("server started at port 3000")
})