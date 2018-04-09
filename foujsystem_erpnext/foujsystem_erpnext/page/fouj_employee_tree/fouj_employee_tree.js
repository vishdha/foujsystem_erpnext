//frappe.provide("frappe.treeview_settings");
frappe.provide('frappe.views.trees');


frappe.pages['fouj-employee-tree'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Fouj Employee Tree',
		single_column: true
	});

	frappe.model.with_doctype("Employee", function() {
		var options = {
			doctype: "Employee",
			meta: frappe.get_meta("Employee"),
			"breadcrumb":"Foujsystem Erpnext",
			"get_tree_nodes": "foujsystem_erpnext.foujsystem_erpnext.page.fouj_employee_tree.fouj_employee_tree.get_children",
			"doctype":"Employee",
			"root_label":"Employee",
			filters: [
				{
					fieldname: "company",
					fieldtype:"Select",
					options: $.map(locals[':Company'], function(c) { return c.name; }).sort(),
					label: __("Company"),
					default: frappe.defaults.get_default('company') ? frappe.defaults.get_default('company') : ""
				}],
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
					console.log("node", node)
					let page = $(document);
					console.log("page", page)
					if(!node.is_root) {
						frappe.db.get_value("Employee", node.data.value, "department")
							.then((r) => {
								if(r.message.department){
									let x = page.find(`span[data-label="${node.data.value}"] .tree-label span.text-muted`);
									console.log("x",x,x.text(` ${ x.text() } ( ${r.message.department} )`));
									x.text(` ${ x.text() } ( ${r.message.department} )`);
								}
							})
					}
				}
			}

		new frappe.views.TreeView(options);

	});
}
