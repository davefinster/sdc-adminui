/** @jsx React.DOM */

var React = require('react')
var cx = React.addons.classSet;

var SecondaryNav = React.createClass({
    propTypes: {
        handleMenuSelect: React.PropTypes.func.isRequired,
        active: React.PropTypes.string
    },
    _clickedMenuItem: function(e) {
        e.preventDefault();
        var view = e.currentTarget.getAttribute('data-view');
        this.props.handleMenuSelect(view);
    },
    _classesFor: function(v) {
        console.log(this.props.active);
        return cx({
            active: (this.props.active === v)
        });
    },
    render: function() {
        return (<div id="secondarynav">
            <ul className="nav">
                <li className="nav-header">Compute</li>
                <li className={this._classesFor('dashboard')} onClick={this._clickedMenuItem} data-view="dashboard"><a href="/dashboard"><i className="fa fa-home"></i> Dashboard</a></li>
                <li className={this._classesFor('vms')} onClick={this._clickedMenuItem} data-view="vms"><a href="/vms">Virtual Machines</a></li>
                <li className={this._classesFor('servers')} onClick={this._clickedMenuItem} data-view="servers"><a href="/servers">Servers</a></li>
                <li className={this._classesFor('images')} onClick={this._clickedMenuItem} data-view="images"><a href="/images">Images</a></li>
                <li className={this._classesFor('packages')} onClick={this._clickedMenuItem} data-view="packages"><a href="/packages">Packages</a></li>

                <li className="nav-header">Infrastructure</li>
                <li className={this._classesFor('jobs')} onClick={this._clickedMenuItem} data-view="jobs"><a href="/jobs">Jobs</a></li>
                <li className={this._classesFor('services')} onClick={this._clickedMenuItem} data-view="services"><a href="/services">Services</a></li>
                <li className={this._classesFor('networking')} onClick={this._clickedMenuItem} data-view="networking"><a href="/networks">Networking</a></li>
            </ul>
        </div>);
    }
});

module.exports = SecondaryNav;
