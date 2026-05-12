const ConditionService = require('../services/conditionService');

class ConditionController {
    async addVideo(req, res) {
        try {
            const { name } = req.params;
            const video = req.body;
            const condition = await ConditionService.addVideo(name, video);
            res.status(201).json({ error: error.message });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async removeVideo(req, res) {
        try {
            const { name, videoId } = req.params;
            const condition = await ConditionService.removeVideo(name, videoId);
            res.status(200).json(condition);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAllConditions(req, res) {
        try {
            const conditions = await ConditionService.getAllConditions();
            res.status(200).json(conditions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getConditionByName(req, res) {
        try {
            const { name } = req.params;
            const condition = await ConditionService.getConditionByName(name);
            res.status(200).json(condition);
        } catch (error) {
            if (error.message === 'Condition not found') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async createCondition(req, res) {
        try {
            const conditionData = req.body;
            const condition = await ConditionService.createCondition(conditionData);
            res.status(201).json(condition);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateCondition(req, res) {
        try {
            const { name } = req.params;
            const updateData = req.body;
            const condition = await ConditionService.updateCondition(name, updateData);
            res.status(200).json(condition);
        } catch (error) {
            if (error.message === 'Condition not found') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async deleteCondition(req, res) {
        try {
            const { name } = req.params;
            await ConditionService.deleteCondition(name);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Condition not found') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async addRemedy(req, res) {
        try {
            const { name } = req.params;
            const remedy = req.body;
            const condition = await ConditionService.addRemedy(name, remedy);
            res.status(201).json(condition);
        } catch (error) {
            if (error.message === 'Condition not found') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async addExercise(req, res) {
        try {
            const { name } = req.params;
            const exercise = req.body;
            const condition = await ConditionService.addExercise(name, exercise);
            res.status(201).json(condition);
        } catch (error) {
            if (error.message === 'Condition not found') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async addNutrition(req, res) {
        try {
            const { name } = req.params;
            const nutrition = req.body;
            const condition = await ConditionService.addNutrition(name, nutrition);
            res.status(201).json(condition);
        } catch (error) {
            if (error.message === 'Condition not found') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }
}

module.exports = new ConditionController();