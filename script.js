const ITEMS_CONTAINER = document.getElementById("items")
const ITEMS_TEMPLATES = document.getElementById("itemTemplate")
const ADD_BUTTON = document.getElementById("add")

let items = getItems()

function getItems() {
	const value = localStorage.getItem("todo-test") || "[]"

	return JSON.parse(value)
}

function setItems(items) {
	const itemsJson = JSON.stringify(items)

	localStorage.setItem("todo-test", itemsJson)
}

function addItems() {
	items.unshift({
		description: "",
		completed: false,
	})

	setItems(items)
	refreshList()
}

function updateItems(item, key, value) {
	item[key] = value
	setItems(items)
	refreshList()
}

function refreshList() {
	//Todo sort items
	items.sort((a, b) => {
		if (a.completed) {
			return 1
		}
		if (b.completed) {
			return -1
		}

		return a.description < b.description ? -1 : 1
	})

	ITEMS_CONTAINER.innerHTML = ""

	for (const item of items) {
		const itemElement = ITEMS_TEMPLATES.content.cloneNode(true)
		const completedInput = itemElement.querySelector(".item-completed")
		const descriptionInput = itemElement.querySelector(".item-description")

		completedInput.checked = item.completed
		descriptionInput.value = item.description

		completedInput.addEventListener("change", () => {
			updateItems(item, "completed", completedInput.checked)
		})

		descriptionInput.addEventListener("change", () => {
			updateItems(item, "description", descriptionInput.value)
		})

		ITEMS_CONTAINER.append(itemElement)
	}
}

ADD_BUTTON.addEventListener("click", () => {
	addItems()
})

refreshList()
