'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">platform documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ActivityModule.html" data-type="entity-link" >ActivityModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ActivityRoutingModule.html" data-type="entity-link" >ActivityRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AdminDashboardModule.html" data-type="entity-link" >AdminDashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AdminDashboardModule-d53418e88692ed5c435768bf6e9875c0f72c205288b95d68eba9da9f74090ef152759e44754365877407a6d397bbd27306db4dd3ecbbbee298d6ab3ebe88d3f7"' : 'data-bs-target="#xs-components-links-module-AdminDashboardModule-d53418e88692ed5c435768bf6e9875c0f72c205288b95d68eba9da9f74090ef152759e44754365877407a6d397bbd27306db4dd3ecbbbee298d6ab3ebe88d3f7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminDashboardModule-d53418e88692ed5c435768bf6e9875c0f72c205288b95d68eba9da9f74090ef152759e44754365877407a6d397bbd27306db4dd3ecbbbee298d6ab3ebe88d3f7"' :
                                            'id="xs-components-links-module-AdminDashboardModule-d53418e88692ed5c435768bf6e9875c0f72c205288b95d68eba9da9f74090ef152759e44754365877407a6d397bbd27306db4dd3ecbbbee298d6ab3ebe88d3f7"' }>
                                            <li class="link">
                                                <a href="components/AdminDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersHeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminDashboardRoutingModule.html" data-type="entity-link" >AdminDashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoordinatorDashboardModule.html" data-type="entity-link" >CoordinatorDashboardModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoordinatorDashboardRoutingModule.html" data-type="entity-link" >CoordinatorDashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DeliveriesDashboardModule.html" data-type="entity-link" >DeliveriesDashboardModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DeliveriesDashboardRoutingModule.html" data-type="entity-link" >DeliveriesDashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MetricsModule.html" data-type="entity-link" >MetricsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MetricsRoutingModule.html" data-type="entity-link" >MetricsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OrdersModule.html" data-type="entity-link" >OrdersModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OrdersRoutingModule.html" data-type="entity-link" >OrdersRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PagesModule.html" data-type="entity-link" >PagesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PagesRoutingModule.html" data-type="entity-link" >PagesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ServicesModule.html" data-type="entity-link" >ServicesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ServicesModule.html" data-type="entity-link" >ServicesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ServicesRoutingModule.html" data-type="entity-link" >ServicesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ServicesRoutingModule.html" data-type="entity-link" >ServicesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SupportDashboardModule.html" data-type="entity-link" >SupportDashboardModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SupportDashboardRoutingModule.html" data-type="entity-link" >SupportDashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersDashboardModule.html" data-type="entity-link" >UsersDashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UsersDashboardModule-ed69a4a946f22cbd2b744b44b00109277d6352226d6e81501e0f6afb40aa26302e47252200a8b379275431425dba22d460b5a746224f83554fb7353156982641"' : 'data-bs-target="#xs-components-links-module-UsersDashboardModule-ed69a4a946f22cbd2b744b44b00109277d6352226d6e81501e0f6afb40aa26302e47252200a8b379275431425dba22d460b5a746224f83554fb7353156982641"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersDashboardModule-ed69a4a946f22cbd2b744b44b00109277d6352226d6e81501e0f6afb40aa26302e47252200a8b379275431425dba22d460b5a746224f83554fb7353156982641"' :
                                            'id="xs-components-links-module-UsersDashboardModule-ed69a4a946f22cbd2b744b44b00109277d6352226d6e81501e0f6afb40aa26302e47252200a8b379275431425dba22d460b5a746224f83554fb7353156982641"' }>
                                            <li class="link">
                                                <a href="components/UsersDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersHeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersDashboardRoutingModule.html" data-type="entity-link" >UsersDashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersRoutingModule.html" data-type="entity-link" >UsersRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ZonesModule.html" data-type="entity-link" >ZonesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ZonesRoutingModule.html" data-type="entity-link" >ZonesRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AdminLoginComponent.html" data-type="entity-link" >AdminLoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BulkUploadComponent.html" data-type="entity-link" >BulkUploadComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CoordinatorDashboardComponent.html" data-type="entity-link" >CoordinatorDashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DeliveriesDashboardComponent.html" data-type="entity-link" >DeliveriesDashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FaqsComponent.html" data-type="entity-link" >FaqsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent.html" data-type="entity-link" >HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListComponent.html" data-type="entity-link" >ListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListComponent-1.html" data-type="entity-link" >ListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListComponent-2.html" data-type="entity-link" >ListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListComponent-3.html" data-type="entity-link" >ListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainComponent.html" data-type="entity-link" >MainComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ManageComponent.html" data-type="entity-link" >ManageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ManagementComponent.html" data-type="entity-link" >ManagementComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MapaViewerComponent.html" data-type="entity-link" >MapaViewerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MyServicesComponent.html" data-type="entity-link" >MyServicesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NewComponent.html" data-type="entity-link" >NewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NewComponent-1.html" data-type="entity-link" >NewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PaginationComponent.html" data-type="entity-link" >PaginationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PanelComponent.html" data-type="entity-link" >PanelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RegisterComponent.html" data-type="entity-link" >RegisterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SendRecoverEmailComponent.html" data-type="entity-link" >SendRecoverEmailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SetNewPasswordComponent.html" data-type="entity-link" >SetNewPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SupportDashboardComponent.html" data-type="entity-link" >SupportDashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UsersHeaderComponent.html" data-type="entity-link" >UsersHeaderComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ZoneService.html" data-type="entity-link" >ZoneService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CourierPerformance.html" data-type="entity-link" >CourierPerformance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GeographicPoint.html" data-type="entity-link" >GeographicPoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GeographicPoint-1.html" data-type="entity-link" >GeographicPoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LogActividad.html" data-type="entity-link" >LogActividad</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MetricCard.html" data-type="entity-link" >MetricCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PedidoVinculado.html" data-type="entity-link" >PedidoVinculado</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UsuarioLog.html" data-type="entity-link" >UsuarioLog</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Zone.html" data-type="entity-link" >Zone</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ZoneMetric.html" data-type="entity-link" >ZoneMetric</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});