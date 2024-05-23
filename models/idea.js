const ideaSchema = new mongoose.Schema({
    title: { type: String, required: true},
    content: {type: String, required: true }
});

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;