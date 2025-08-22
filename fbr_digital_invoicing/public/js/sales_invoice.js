frappe.ui.form.on('Sales Invoice', {
    refresh: function (frm) {
        if (frm.doc.docstatus === 1 && !frm.doc.custom_fbr_invoice_no) {
            frm.add_custom_button(__('Post to FBR'), function () {
                frappe.call({
                    method: 'fbr_digital_invoicing.document_controllers.sales_invoice.post_to_fbr',
                    args: {
                        docname: frm.doc.name
                    },
                    freeze: true,
                    callback: function (r) {
                        if (!r.exc) {
                            frappe.msgprint(__('Posted successfully to FBR.'));
                            frm.reload_doc();
                        }
                    }
                });
            });
        }
    }
});
