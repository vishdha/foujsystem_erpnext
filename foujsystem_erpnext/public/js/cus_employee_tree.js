frappe.treeview_settings['Employee'] = {
	get_tree_nodes: "erpnext.hr.doctype.employee.employee.get_children",
	filters: [
		{
			fieldname: "company",
			fieldtype:"Select",
			options: $.map(locals[':Company'], function(c) { return c.name; }).sort(),
			label: __("Company"),
			default: frappe.defaults.get_default('company') ? frappe.defaults.get_default('company') : ""
		}
	],
	breadcrumb: "Hr",
	disable_add_node: true,
	get_tree_root: false,
	toolbar: [
		{ toggle_btn: true },
		{
			label:__("Edit"),
			condition: function(node) {
				return !node.is_root;
			},
			click: function(node) {
				frappe.set_route("Form", "Employee", node.data.value);
			}
		}
	],
	menu_items: [
		{
			label: __("New Employee"),
			action: function() {
				frappe.new_doc("Employee", true);
			},
			condition: 'frappe.boot.user.can_create.indexOf("Employee") !== -1'
		}
	],
	onrender(node) {
		console.log("node12", node)
		let page = $(document);
		console.log("page", page, node.is_root)
		if(!node.is_root) {
			frappe.db.get_value("Employee", node.data.value, "department")
				.then((r) => {
					console.log("r", r.message.department)
					if(r.message.department){
						let x = page.find(`span[data-label="${node.data.value}"] .tree-label span.text-muted`);
						console.log("x",x, `$(r.message.department)`);
						x.text(` ${ x.text() } ( ${r.message.department} )`);
					}
				})
		}
	}
};