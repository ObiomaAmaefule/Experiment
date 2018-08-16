/*var trials_raw = [
	{question: "How are you today?", option1: "fine", option2: "great", picture: "images/question_mark_01.png"},
    {question: "What is the weather like?", option1: "shiny", option2: "rainbow", picture: "images/question_mark_02.png"},
    {question: "How are you today?", option1: "fine", picture1: "images/question_mark_02.png", option2: "great", picture2: "images/question_mark_01.png"},
	{question: "What is the weather like?", option1: "shiny", picture1: "images/question_mark_03.png", option2: "rainbow", picture2: "images/question_mark_04png"},
];*/

// if there is more than 1 type of task
// we need to separate them because they might have different props (for example, two iamges)
// thus, shuffling the list of items might result in the wrong trials displayed by the view
// the other option is having each type of trial in a separate list
var trials_raw = {
    // key press     
    keyPress: [
        {question: "Desert   |   Glasses", picture: "images/question_mark_04.png", key1: "f", key2: "j", f: "not likey to remember", j: "most likey to remember", expected: "not likey to remember"},
        {question: "Bank     |   Money", picture: "images/question_mark_04.png", key1: "f", key2: "j", f: "not likey to remember", j: "most likey to remember", expected: "most likey to remember"},
        {question: "Stove    |   Mountain", picture: "images/question_mark_04.png", key1: "f", key2: "j", f: "not likey to remember", j: "most likey to remember", expected: "not likey to remember"},
        {question: "Fork     |   Knife", picture: "images/question_mark_04.png", key1: "f", key2: "j", f: "not likey to remember", j: "most likey to remember", expected: "most likey to remember"},
        {question: "Bacon    |   Traffic", picture: "images/question_mark_04.png", key1: "f", key2: "j", f: "not likey to remember", j: "most likey to remember", expected: "not likey to remember"},
        {question: "Camera   |   Photo", picture: "images/question_mark_04.png", key1: "f", key2: "j", f: "not likey to remember", j: "most likey to remember", expected: "most likey to remember"},
        {question: "Chest    |   Melon", picture: "images/question_mark_04.png", key1: "f", key2: "j", f: "not likey to remember", j: "most likey to remember", expected: "not likey to remember"},
        {question: "Radio    |   Music", picture: "images/question_mark_04.png", key1: "f", key2: "j", f: "not likey to remember", j: "most likey to remember", expected: "most likey to remember"}
    ],

     // textbox input
    textboxInput: [
        {question: "Desert", picture: "images/question_mark_01.png"},
        {question: "Bank", picture: "images/question_mark_01.png"},
        {question: "Stove", picture: "images/question_mark_01.png"},
        {question: "Fork", picture: "images/question_mark_01.png"},
        {question: "Bacon", picture: "images/question_mark_01.png"},
        {question: "Camera", picture: "images/question_mark_01.png"},
        {question: "Chest", picture: "images/question_mark_01.png"},    
        {question: "Radio", picture: "images/question_mark_01.png"}
    ]
};