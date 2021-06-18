import * as React from "react";
import processProducts from "../services/processProduct";

// This was mostly copied last minute from https://reactjs.org/docs/forms.html to include 
// an editor for the catalog
class CatalogEditor extends React.Component <any, { value: string }>{
    catalog: any;
    value: string;
    updateCatalog: any;
    updateCart: any;
    updateCartResponse: any;

    constructor(props: any) {
      super(props);
      this.state = {
        value: JSON.stringify(props.catalog)
      };
      this.catalog = props.catalogState;
      this.updateCatalog = props.updateCatalog;
      this.updateCart = props.updateCart;
      this.updateCartResponse = props.updateCartResponse;
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event: any) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event: any) {
      try{
        let catalog = JSON.parse(this.state.value);
        catalog = processProducts(catalog);

        this.updateCatalog(catalog);
        this.updateCart([]);
        this.updateCartResponse({
            totalTax: 0.00,
            totalAfterTax: 0.00
          })
      } catch(e){
        alert('Invalid JSON');
      }
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Catalog Editor:</label>
                <textarea rows="10" className="form-control catalogEditor" value={this.state.value} onChange={this.handleChange} />
                <input className="btn btn-primary mb-2" type="submit" value="Submit" />
          </div>
        </form>
      );
    }
  }

  export default CatalogEditor;