const express = require('express');
const Lead = require('../models/lead');
const router = express.Router();

const { body, validationResult } = require('express-validator');

router.post('/addlead', [
    body('customerName','Please enter minimun 2 letters').isLength({min:2}),
    body('phoneNumber','Please enter valid phone number').isLength({min:10,max:10}),
    body('inquiry','Please enter minimun 2 letters').isLength({min:2}),
    body('sourceOfInquiry','Please enter minimun 2 letters').isLength({min:2}),
    body('remark','Please enter minimun 2 letters').isLength({min:2}),
    body('callerName','Please enter minimun 2 letters').isLength({min:2}),
    body('salesExecutiveName','Please enter minimun 2 letters').isLength({min:2}),
], async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        
        const lead = await Lead.create({
            customerName: req.body.customerName,
            phoneNumber: req.body.phoneNumber,
            inquiry: req.body.inquiry,
            sourceOfInquiry: req.body.sourceOfInquiry,
            instock: req.body.instock,
            remark: req.body.remark,
            callerName: req.body.callerName,
            salesExecutiveName: req.body.salesExecutiveName
        });
        res.send(lead);

    } catch (error) {
        res.status(400).send(`Internal server error => ${error}`)
    }
});

router.put('/updatelead/:id', async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        
        const updateLead = await Lead.findByIdAndUpdate(req.params.id,{
            customerName: req.body.customerName,
            phoneNumber: req.body.phoneNumber,
            inquiry: req.body.inquiry,
            sourceOfInquiry: req.body.sourceOfInquiry,
            instock: req.body.instock,
            remark: req.body.remark,
            callerName: req.body.callerName,
            salesExecutiveName: req.body.salesExecutiveName
        },{
            new: true
        });

        res.send(updateLead);

    } catch (error) {
        res.status(400).send(`Internal server error => ${error}`)
    }
});

router.get('/leadlist', async (req,res)=> {
    try {
        const leadList = await Lead.find();
        res.json(leadList);
    } catch (error) {
        res.status(400).send(`Internal server error => ${error}`)
    }
}); 

router.delete('/deletelead/:id', async (req,res)=> {
    const leadId = req.params.id;
    try {
        const deleteLead = await Lead.findByIdAndDelete(leadId);
        if (deleteLead) {
            res.send(deleteLead);
        }
        else {
            res.status(400).send("This lead already deleted.");
        }
    } catch (error) {
        res.status(400).send(`Internal server error => ${error}`)
    }
}); 

module.exports = router;