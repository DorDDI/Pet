const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

// Cross Origin Resource Sharing
app.use(cors());




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));