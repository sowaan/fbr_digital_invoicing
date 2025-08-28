// Copyright (c) 2025, SowaanERP and contributors
// For license information, please see license.txt

frappe.ui.form.on("FBR Digital Invoicing Setting", {
	refresh(frm) {

	},
    test_scenario(frm){
        frappe.call({
            method: 'fbr_digital_invoicing.document_controllers.sales_invoice.post_to_fbr',
            args: {
                docname: frm.doc.sales_invoice,
                sn_id: frm.doc.scenario_id
            },
            freeze: true,
            callback: function (r) {
                if (!r.exc) {
                    frappe.msgprint(__('Scenario posted successfully to FBR.'));
                }
            }
        });
    }
});
