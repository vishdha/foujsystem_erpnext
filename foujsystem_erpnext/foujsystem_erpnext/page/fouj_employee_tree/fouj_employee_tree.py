from __future__ import unicode_literals
import frappe, json
from frappe.model.document import Document
from erpnext.hr.doctype.employee.employee import get_children 

@frappe.whitelist()
def get_children(is_root=False, company=None,  parent=None):
	condition = ''

	if is_root:
		parent = ""
	if parent and company and parent!=company:
		condition = ' and reports_to = "{0}"'.format(frappe.db.escape(parent))
	else:
		condition = ' and ifnull(reports_to, "")=""'

	employee = frappe.db.sql("""
		select
			name as value, CONCAT_WS(" ", employee_name, "/", department) as title,
			exists(select name from `tabEmployee` where reports_to=emp.name) as expandable
		from
			`tabEmployee` emp
		where company='{company}' {condition} order by name"""
		.format(company=company, condition=condition),  as_dict=1)

	# return employee
	return employee

