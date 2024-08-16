const Category = require("../models/Category");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// create Category handler function
exports.createCategory = async (req, res) => {
  try {
    // fetch data from request body
    const { name, description } = req.body;

    // validate data
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // create an entry in DB
    const category = await Category.create({ name, description });
    console.log(category);

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating Category",
    });
  }
};

// get all Categories handler functions
exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    );

    res.status(200).json({
      success: true,
      message: "All Categories are fetched successfully",
      data: allCategories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while getting all Categories",
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();
    console.log(selectedCategory);

    // Handle the case when category is not found
    if (!selectedCategory) {
      console.log("Category not found.");
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Handle the case when there are no courses for that category
    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category",
      });
    }

    // const selectedCourses = selectedCategory.courses;

    // Get courses for other categories
    const categoriesExceptedSelected = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();

    // let differentCourses = [];
    // for (const category of categoriesExceptedSelected) {
    //   differentCourses.push(...category.courses);
    // }

    let differentCategory = await Category.findOne(
      categoriesExceptedSelected[
        getRandomInt(categoriesExceptedSelected.length)
      ]._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();

    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    res.status(200).json({
      success: true,
      data: {
        selectedCategory: selectedCategory,
        differentCategory: differentCategory,
        mostSellingCourses: mostSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
