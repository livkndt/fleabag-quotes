"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quotes = [
    {
        id: 1,
        character: 'Anthony',
        quote: "If you want to change your life, change your life. It isn't going to happen in here.",
    },
    {
        id: 2,
        character: 'Belinda',
        quote: 'It is not a party until someone flirts with you.',
    },
    {
        id: 3,
        character: 'Belinda',
        quote: "People are all we've got. So grab the night by its nipples and go flirt with someone.",
    },
    {
        id: 4,
        character: 'Belinda',
        quote: 'There is nothing more exciting than a room full of people.',
    },
    {
        id: 5,
        character: 'Belinda',
        quote: "Women are born with pain built in. It's our physical destiny. Period pain. Sore boobs. Childbirth. We carry it within ourselves throughout our lives. Men don't. They have to seek it out.",
    },
    {
        id: 6,
        character: 'Boo',
        quote: "As long as I can wear it or eat it, I'm happy.",
    },
    {
        id: 7,
        character: 'Boo',
        quote: "That's the very reason why they put rubbers on the end of pencils... because people make mistakes.",
    },
    {
        id: 8,
        character: 'Claire',
        quote: "I don't believe you can pray your problems away. I think you have to face who you are and suffer the consequences. It's the only road to happiness.",
    },
    {
        id: 9,
        character: 'Claire',
        quote: "I don't believe in foxes.",
    },
    {
        id: 10,
        character: 'Claire',
        quote: "The only person I'd run through an airport for is you.",
    },
    {
        id: 11,
        character: 'Claire',
        quote: "We're not friends. We are sisters. Get your own friends.",
    },
    {
        id: 12,
        character: 'Claire',
        quote: 'The world is full of normal, decent people who are not for me.',
    },
    {
        id: 13,
        character: 'Dad',
        quote: "I think you know how to love better than any of us. That's why you find it all so painful.",
    },
    {
        id: 14,
        character: 'Fleabag',
        quote: "Being proper and sweet and nice and pleasing is a fucking nightmare. It's exhausting.",
    },
    {
        id: 15,
        character: 'Fleabag',
        quote: "Chic means boring. Don't tell the French.",
    },
    {
        id: 16,
        character: 'Fleabag',
        quote: 'Do I have a massive arsehole?',
    },
    {
        id: 17,
        character: 'Fleabag',
        quote: "Don't make me an optimist. You will ruin my life.",
    },
    {
        id: 18,
        character: 'Fleabag',
        quote: "Either everyone feels like this just a little bit and they're not talking about it, or I am completely fucking alone. Which isn't fucking funny.",
    },
    {
        id: 19,
        character: 'Fleabag',
        quote: 'Hair is everything.',
    },
    {
        id: 20,
        character: 'Fleabag',
        quote: "I don't think you have to be alone to be lonely.",
    },
    {
        id: 21,
        character: 'Fleabag',
        quote: "I have a horrible feeling that I'm a greedy, perverted, selfish, apathetic, cynical, depraved, morally bankrupt woman who can't even call herself a feminist.",
    },
    {
        id: 22,
        character: 'Fleabag',
        quote: "I sometimes worry that I wouldn't be such a feminist if I had bigger tits.",
    },
    {
        id: 23,
        character: 'Fleabag',
        quote: 'I spent most of my adult life using sex to deflect from the screaming void inside my empty heart.',
    },
    {
        id: 24,
        character: 'Fleabag',
        quote: 'I took half an hour trying to look nice and I ended up looking amazing.',
    },
    {
        id: 25,
        character: 'Fleabag',
        quote: "I want someone to tell me what to wear every morning. I want someone to tell me what to eat. What to like, what to hate, what to rage about, what to listen to, what band to like, what to buy tickets for, what to joke about, what not to joke about. I want someone to tell me what to believe in, who to vote for, and who to love, and how to tell them. I just think I want someone to tell me how to live my life, Father, because so far I think I've been getting it wrong.",
    },
    {
        id: 26,
        character: 'Fleabag',
        quote: "I just think I want someone to tell me how to live my life, Father, because so far I think I've been getting it wrong.",
    },
    {
        id: 27,
        character: 'Fleabag',
        quote: "I'm not obsessed with sex. I just can't stop thinking about it. The performance of it. The awkwardness of it. The drama of it.",
    },
    {
        id: 28,
        character: 'Fleabag',
        quote: "If it's any consolation, you look older than you are.",
    },
    {
        id: 29,
        character: 'Fleabag',
        quote: "If you rid a woman of her head and limbs you can't really expect her to do anything other than roll around.",
    },
    {
        id: 30,
        character: 'Fleabag',
        quote: "It's like having sex with a protractor.",
    },
    {
        id: 31,
        character: 'Fleabag',
        quote: "Maybe happiness isn't what you believe, but who you believe.",
    },
    {
        id: 32,
        character: 'Fleabag',
        quote: 'My bottom dropped ages ago. My farts used to be like "pah!". Now they\'re just sort of fighting their way out.',
    },
    {
        id: 33,
        character: 'Fleabag',
        quote: "Tits don't get you anywhere these days. Trust me.",
    },
    {
        id: 34,
        character: 'Fleabag',
        quote: "Yeah, he's horrifically hot. You're gonna puke when you see him.",
    },
    {
        id: 35,
        character: 'Harry',
        quote: "Don't make me hate you. Loving you is painful enough.",
    },
    {
        id: 36,
        character: 'Klare',
        quote: 'I ate a sausage over there, thinking it was a prune. 15 years of vegetarianism, gone. Like bang, bang.',
    },
    {
        id: 37,
        character: 'Martin',
        quote: "I'm not a bad guy. I just have a bad personality.",
    },
    {
        id: 38,
        character: 'The Counsellor',
        quote: "You already know what you're going to do. Everybody does.",
    },
    {
        id: 39,
        character: 'The Priest',
        quote: 'The Bible... very good in places.',
    },
    {
        id: 40,
        character: 'The Priest',
        quote: 'Celibacy is a lot less complicated than romantic relationships.',
    },
    {
        id: 41,
        character: 'The Priest',
        quote: "Here's to peace. And those who get in the way of it.",
    },
    {
        id: 42,
        character: 'The Priest',
        quote: "I was taught if we're born with love, then life is about choosing the right place to put it. People talk about that a lot, it feeling right. When it feels right, it's easy. But I'm not sure that's true. It takes strength to know what's right. And love isn't something that weak people do.",
    },
    {
        id: 43,
        character: 'The Priest',
        quote: 'I think what they mean is... when you find somebody that you love, it feels like hope.',
    },
    {
        id: 44,
        character: 'The Priest',
        quote: "So it turns out it's quite hard to come up with something original to say about love, but I've had a go. Love is awful. It's painful. Frightening. It makes you doubt yourself, judge yourself, distance yourself from the other people in your life. Makes you selfish, makes you creepy, makes you obsessed with your hair. Makes you cruel. Makes you say and do things you never thought you would do. It's all any of us want and it's hell when we get there. So it's no wonder it's something we don't want to do on our own.",
    },
    {
        id: 45,
        character: 'The Priest',
        quote: "So it turns out it's quite hard to come up with something original to say about love.",
    },
    {
        id: 46,
        character: 'The Priest',
        quote: 'Why believe in something awful when you can believe in something wonderful?',
    },
    {
        id: 47,
        character: 'The Priest',
        quote: 'I love you.',
    },
    {
        id: 48,
        character: 'The Priest',
        quote: "Don't.",
    },
    {
        id: 49,
        character: 'Fleabag',
        quote: "It'll pass.",
    },
    {
        id: 50,
        character: 'Fleabag',
        quote: 'I think I might be in love with a priest.',
    },
    {
        id: 51,
        character: 'Fleabag',
        quote: "We have to be kind to each other. It's really all we've got.",
    },
    {
        id: 52,
        character: 'Claire',
        quote: "I'm going to Helsinki.",
    },
    {
        id: 53,
        character: 'Claire',
        quote: 'I use my anger as a fuel. Most women do.',
    },
    {
        id: 54,
        character: 'Godmother',
        quote: 'You really do look ghastly, darling.',
    },
    {
        id: 55,
        character: 'Godmother',
        quote: "I don't need to tell you that your father is a deeply sexual man.",
    },
    {
        id: 56,
        character: 'Boo',
        quote: 'I just wanted him to feel something.',
    },
    {
        id: 57,
        character: 'Godmother',
        quote: "I'll put her back on her shelf... it's funny. Out of all my pieces you chose her. She's based on your mum. So nice to have her back in the house.",
    },
    {
        id: 58,
        character: 'Fleabag',
        quote: "Either she's got her period, or some serious shit has gone down.",
    },
    {
        id: 59,
        character: 'Fleabag',
        quote: 'Do you still wank about me?',
    },
    {
        id: 60,
        character: 'Fleabag',
        quote: "My sister. She's uptight and beautiful and probably anorexic, but clothes look awesome on her so...",
    },
    {
        id: 61,
        character: 'Fleabag',
        quote: "I don't have rye bread, but I have some normal bread you can puke up later?",
    },
    {
        id: 62,
        character: 'Fleabag',
        quote: 'I had to do a flash poo in Pret.',
    },
    {
        id: 63,
        character: 'Fleabag',
        quote: 'Sting wore white jeans and a puppy got stuck in a fan. Big day.',
    },
    {
        id: 64,
        character: 'Fleabag',
        quote: 'Evil boobs everywhere.',
    },
    {
        id: 65,
        character: 'Fleabag',
        quote: "He's one of those men who is explosively sexually inappropriate with everyone but who makes you feel bad if you take offence.",
    },
    {
        id: 66,
        character: 'Fleabag',
        quote: "Sometimes I wish I didn't even know that fucking existed.",
    },
    {
        id: 67,
        character: 'Fleabag',
        quote: "She is not an evil stepmother, she's just a cunt!",
    },
    {
        id: 68,
        character: 'Fleabag',
        quote: "Dad's way of coping with two motherless daughters was to buy us tickets to feminist lectures, start fucking our Godmother and eventually stop calling.",
    },
];
exports.default = quotes;
//# sourceMappingURL=QuoteRepository.js.map