// function buildCritiria(query) {
//   const critiria = {};

//   if (query.name) {
//     critiria.name = { $regex: query.name, $options: "i" };
//   }

//   if (query.category) {
//     critiria.category = { $regex: query.category, $options: "i" };
//   }

//   if (query.quantity) {
//     critiria.quantity = { $regex: query.quantity, $options: "i" };
//   }

//   // Check if minPrice
//   if (query.minPrice && !isNaN(query.minPrice)) {
//     query.minPrice = parseFloat(query.minPrice);
//     critiria.price = { $gte: query.minPrice };
//   }

//   // Check if maxPrice
//   if (query.maxPrice && !isNaN(query.maxPrice)) {
//     query.maxPrice = parseFloat(query.maxPrice);
//     // Check if price is already in critiria
//     if (!critiria.price) {
//       critiria.price = {};
//     }
//     // Add $lte to price
//     critiria.price.$lte = query.maxPrice;
//   }

//   // Check if inStock filter is applied
//   if (query.inStock === 'true') {
//     critiria.quantity = { $gt: 0 }; 
//   }

//   return critiria;
// }

// module.exports = {
//   buildCritiria,
// };
