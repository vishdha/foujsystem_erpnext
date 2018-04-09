from frappe import _

def get_data():
	return [
		{
			"label": _("Employee"),
			"icon": "icon-star",
			"items": [
				{
					"type": "page",
					"name": "fouj-employee-tree",
					"label": "Fouj Employee Tree",
					"description": _("Fouj Employee Tree"),
				}
			]
		}
	]
