// Test case 1: shapeId exists in savedData
showActiveShapeSelected("shape-1");
// Expected: savedData["shape-1"].isSelected = true, savedData["shape-1"].isNotSelected = false

// Test case 2: shapeId does not exist in savedData
showActiveShapeSelected("shape-10");
// Expected: No change in savedData