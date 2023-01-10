let isEditing = false;
let selectedRecipeIndex = 0;
let errorStatusTitle = false;
let errorStatusDescription = false;
let errorStatusSteps = false;

//Edit a recipe
const editRecipe = (e) => {
  isEditing = true;
  const divRecipe = e.target.parentElement;
  selectedRecipeIndex = +divRecipe.dataset.recipe;
  const titleText = divRecipe.querySelector("h5").innerText;
  document.querySelector(".recipe-title").value = titleText;
  const descriptionText = divRecipe.querySelector(".description").innerText;
  document.querySelector(".recipe-description").value = descriptionText;
  const portionsText = divRecipe.querySelector(".portions").innerText;
  document.querySelector(".recipe-portions").value = portionsText;
  const timeText = divRecipe.querySelector(".time").innerText;
  document.querySelector(".recipe-time").value = timeText;
  const difficultyText = divRecipe.querySelector(".difficulty").innerText;
  document.querySelector(".recipe-difficulty").value = difficultyText;
  const selectedRecipeConvertedSteps = [];
  const selectedRecipeSteps = divRecipe.querySelectorAll(".preparation li");
  selectedRecipeSteps.forEach((element) => {
    selectedRecipeConvertedSteps.push(element.innerText);
  });
  document.querySelector(".recipe-steps").value = selectedRecipeConvertedSteps;
};

//Save button
const saveButton = document.querySelector(".save-recipe");
saveButton.addEventListener("click", (e) => {
  const title = document.querySelector(".recipe-title").value;
  const description = document.querySelector(".recipe-description").value;
  const portions = document.querySelector(".recipe-portions").value;
  const time = document.querySelector(".recipe-time").value;
  const difficulty = document.querySelector(".recipe-difficulty").value;
  const steps = document.querySelector(".recipe-steps").value;

  if (isEditing == true) {
    const selectedRecipe = document.querySelector(
      `.recipe-item[data-recipe="${selectedRecipeIndex}"`
    );
    const selectOption = document.querySelectorAll(".select-recipe option");
    selectOption.forEach((element) => {
      if (element.innerText == selectedRecipe.querySelector("h5").innerText) {
        element.innerText = title;
      }
    });
    selectedRecipe.querySelector("h5").innerText = title;
    selectedRecipe.querySelector(".description").innerText = description;
    selectedRecipe.querySelector(".portions").innerText = portions;
    selectedRecipe.querySelector(".time").innerText = time;
    selectedRecipe.querySelector(".difficulty").innerText = difficulty;
    selectedRecipe.querySelector(".preparation").innerHTML = "";
    const step = steps.split(",");

    step.forEach((element) => {
      const newRecipeLi = document.createElement("li");
      newRecipeLi.innerText = element;
      selectedRecipe.querySelector(".preparation").appendChild(newRecipeLi);
    });

    isEditing = false;
  } else {
    if (title != "" && description != "" && steps != "") {
      // Create elements
      const curentRecipes = document.querySelectorAll(".recipe-item");

      const newRecipeContainer = document.createElement("div");
      newRecipeContainer.classList.add("recipe-item");

      newRecipeContainer.dataset.recipe = curentRecipes.length;

      const newRecipeTitle = document.createElement("h5");
      newRecipeTitle.innerText = title;

      const newRecipeDescribed = document.createElement("p");
      newRecipeDescribed.innerText = description;
      newRecipeDescribed.classList.add("description");

      const newRecipeSteps = document.createElement("ol");
      newRecipeSteps.classList.add("preparation");

      const newRecipeDescription = document.createElement("p");
      const recipePortions = document.createElement("span");
      recipePortions.classList.add("portions");
      recipePortions.innerText = portions;
      const recipeTime = document.createElement("span");
      recipeTime.classList.add("time");
      recipeTime.innerText = time;
      const recipeDifficulty = document.createElement("span");
      recipeDifficulty.classList.add("difficulty");
      recipeDifficulty.innerText = difficulty;
      newRecipeDescription.append("Portion(s) ");
      newRecipeDescription.append(recipePortions);
      newRecipeDescription.append(" min(s) ");
      newRecipeDescription.append(recipeTime);
      newRecipeDescription.append(" Difficulty ");
      newRecipeDescription.append(recipeDifficulty);

      const step = steps.split(",");

      step.forEach((element) => {
        const newRecipeLi = document.createElement("li");
        newRecipeLi.innerText = element;
        newRecipeSteps.appendChild(newRecipeLi);
      });

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("bi", "bi-trash", "delete-button");
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", (e) => {
        e.target.parentElement.remove();
      });

      const editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.classList.add("edit-recipe");
      editButton.addEventListener("click", editRecipe);

      // Append elements

      const availableRecipes = document.querySelector(".recipes");
      newRecipeContainer.appendChild(deleteButton);
      newRecipeContainer.appendChild(editButton);
      newRecipeContainer.appendChild(newRecipeTitle);
      newRecipeContainer.appendChild(newRecipeDescribed);
      newRecipeContainer.appendChild(newRecipeDescription);
      newRecipeContainer.appendChild(newRecipeSteps);
      availableRecipes.appendChild(newRecipeContainer);

      const option = document.createElement("option");
      option.innerText = title;
      selectRecipe.add(option);
    } else {
      const titleError = document.createElement("span");
      titleError.innerText = "Error: Fill the title field";
      titleError.style.color = "rgba(255, 0, 0, 0.6 )";
      titleError.style.display = "block";
      titleError.style.marginBottom = "10px";

      const descriptionError = document.createElement("span");
      descriptionError.innerText = "Error: Fill the description field";
      descriptionError.style.color = "rgba(255, 0, 0, 0.6 )";
      descriptionError.style.display = "block";
      descriptionError.classList.add("mb-3");

      const stepsError = document.createElement("span");
      stepsError.innerText = "Error: Fill the steps field";
      stepsError.style.color = "rgba(255, 0, 0, 0.6 )";
      stepsError.style.dispay = "block";

      if (!title && !errorStatusTitle) {
        document.querySelector(".recipe-title").style.border =
          "4px solid rgba(255, 0, 0, 0.6 )";
        document
          .querySelector(".recipe-title")
          .parentElement.appendChild(titleError);
        errorStatusTitle = true;
      }
      if (title !== "") {
        errorStatusTitle = false;
        document.querySelector(".recipe-title").style.border =
          "4px solid rgba(12, 170, 12, 0.4)";
        const errorSpanTitle = document
          .querySelector(".recipe-title")
          .parentElement.querySelector("span");
        if (errorSpanTitle) {
          errorSpanTitle.remove();
        }
      }

      if (!description && !errorStatusDescription) {
        document.querySelector(".recipe-description").style.border =
          "4px solid rgba(255, 0, 0, 0.6 )";
        document
          .querySelector(".recipe-description")
          .parentElement.appendChild(descriptionError);
        errorStatusDescription = true;
      }
      if (description !== "") {
        errorStatusDescription = false;
        document.querySelector(".recipe-description").style.border =
          "4px solid rgba(12, 170, 12, 0.4)";
        const errorSpanDescription = document
          .querySelector(".recipe-description")
          .parentElement.querySelector("span");
        if (errorSpanDescription) {
          errorSpanDescription.remove();
        }
      }

      if (!steps && !errorStatusSteps) {
        document.querySelector(".recipe-steps").style.border =
          "4px solid rgba(255, 0, 0, 0.6 )";
        document
          .querySelector(".recipe-steps")
          .parentElement.appendChild(stepsError);
        errorStatusSteps = true;
      }
      if (steps !== "") {
        errorStatusSteps = false;
        document.querySelector(".recipe-steps").style.border =
          "4px solid rgba(12, 170, 12, 0.4)";
        const errorSpanSteps = document
          .querySelector(".recipe-steps")
          .parentElement.querySelector("span");
        if (errorSpanSteps) {
          errorSpanSteps.remove();
        }
      }
    }
  }
  if (!errorStatusTitle && !errorStatusDescription && !errorStatusSteps) {
    clearForm();
  }
});

// Clear all forms
const clearForm = () => {
  const inputs = document.querySelectorAll(
    "input.recipe-input, textarea.recipe-input"
  );
  const selects = document.querySelectorAll("select.recipe-input");
  inputs.forEach((element) => {
    element.value = "";
  });
  selects.forEach((element) => {
    element.value = "1";
  });
};

// Cancel Button
const cancelButton = document.querySelector(".cancel-button");
cancelButton.addEventListener("click", clearForm);
cancelButton.addEventListener("click", () => {
  document.querySelector(".recipe-title").style.border = "none";
  document.querySelector(".recipe-description").style.border = "none";
  document.querySelector(".recipe-steps").style.border = "none";
  document.querySelector(
    ".recipe-title"
  ).parentElement.lastChild.style.display = "none";
  document.querySelector(
    ".recipe-description"
  ).parentElement.lastChild.style.display = "none";
  document.querySelector(
    ".recipe-steps"
  ).parentElement.lastChild.style.display = "none";
  isEditing = false;
});

//Select a recipe
const selectRecipe = document.querySelector(".select-recipe");
selectRecipe.addEventListener("change", (e) => {
  const selectedRecipe = e.target.value;
  const searchedRecipe = document.querySelectorAll(".recipe-item h5");
  searchedRecipe.forEach((element) => {
    if (selectedRecipe.toLowerCase() == element.innerText.toLowerCase()) {
      element.parentElement.style.border = "2px solid blue";
    } else {
      element.parentElement.style.border = "";
    }
  });
});

// Delete a recipe

const deleteRecipe = (e) => {
  const selectedOption = document.querySelectorAll(".select-recipe option");
  console.log(selectedOption);
  selectedOption.forEach((element) => {
    if (
      element.innerText === e.target.parentElement.querySelector("h5").innerText
    ) {
      element.remove();
    }
  });

  e.target.parentElement.remove();
};

const clearRecipes = () => {
  const recipes = document.querySelectorAll(".recipe-item");
  recipes.forEach((element) => {
    element.remove();
  });
  document.querySelectorAll(".select-recipe option").forEach((element) => {
    if (element.className != "option-one") {
      element.remove();
    }
  });
  clearForm();
  isEditing = false;
};

const clearAllRecipes = document.querySelector(".navbar-brand");
clearAllRecipes.addEventListener("click", clearRecipes);
