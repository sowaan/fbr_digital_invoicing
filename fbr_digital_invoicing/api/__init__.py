import frappe
import requests



class FBRDigitalInvoicingAPI:
    def __init__(self, company: str):
        if not company:
            frappe.throw("Company is required to initialize FBR Digital Invoicing API")

        settings = frappe.get_doc("FBR Digital Invoicing Setting", company)
        self.base_url = settings.get("base_url")
        self.token = settings.get("token")

    def init_request(self):
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.token}"
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)


    def make_request(self, method, endpint, data=None):
        self.init_request()
        print(data)
        request = self.session.request(method, f"{self.base_url}/{endpint}", json=data)
        if request.status_code != 200:
            
            frappe.log_error(
                title="FBR Digital Invoicing API Error",
                message=f"Error in FBR Digital Invoicing API: {request.text}"
            )
            frappe.throw(f"Error in FBR Digital Invoicing API: {request.text}")
        return request.json()
    

