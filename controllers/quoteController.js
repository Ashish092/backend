const Quote = require('../models/Quote');

exports.createQuote = async (req, res) => {
  try {
    const quoteData = {
      serviceType: req.body.serviceType,
      cleaningType: req.body.cleaningType,
      frequency: req.body.frequency,
      propertyType: req.body.propertyType,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      rateType: req.body.rateType,
      preferredDate: req.body.preferredDate,
      preferredTime: req.body.preferredTime,
      parkingAvailable: req.body.parkingAvailable,
      access: req.body.access,
      customer: {
        name: req.body.name,
        companyName: req.body.companyName,
        email: req.body.email,
        phone: req.body.phone,
      },
      address: {
        street: req.body.streetAddress,
        suburb: req.body.suburb,
        state: req.body.state,
        postCode: req.body.postCode
      },
      notes: req.body.notes
    };

    const quote = new Quote(quoteData);
    const savedQuote = await quote.save();
    
    res.status(201).json({
      success: true,
      data: savedQuote
    });
  } catch (error) {
    console.error('Error creating quote:', error);
    res.status(400).json({ 
      success: false,
      message: 'Failed to create quote', 
      error: error.message 
    });
  }
};

exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: quotes
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quotes',
      error: error.message
    });
  }
};

exports.getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }
    res.status(200).json({
      success: true,
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quote',
      error: error.message
    });
  }
};

exports.updateQuote = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body,
        status: req.body.status // Allow status updates
      },
      { new: true, runValidators: true }
    );

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    res.status(200).json({
      success: true,
      data: quote
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating quote',
      error: error.message
    });
  }
}; 