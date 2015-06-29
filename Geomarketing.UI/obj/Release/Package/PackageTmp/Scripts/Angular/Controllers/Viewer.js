angular.module('geomarketing')
    .controller('ViewerController', ['$scope', 'utilityService', function (scope, utilityService) {
        var vm = this;
        scope.bufferValue = 3;
        scope.selectedUnidades;

        vm.selectedCategoria = '';
        vm.categorias = [{ text: "Estación de gasolina", value: "Estación de gasolina" },
                        { text: "Ferretería", value: "Ferretería" },
                        { text: "Hipermercado", value: "Hipermercado" },
                        { text: "Repuestos de autos", value: "Repuestos de autos" },
                        { text: "Supercentro", value: "Supercentro" },
                        { text: "Supermercado", value: "Supermercado" },
                        { text: "Supermercado Cadena", value: "Supermercado Cadena" },
                        { text: "Taller Automotriz", value: "Taller Automotriz" },
                        { text: "Tienda de conveniencia", value: "Tienda de conveniencia" }];
        vm.selected;
        vm.data = [
                { text: "Disponibilidad", value: 7 },
                /*{ text: "Exhibidores", value: 9 },
                { text: "Comunicación Interna", value: 10 },*/
                { text: "Top Of Mind", value: 11 }
        ];
        vm.unidades = [
                { text: "Kilometros", value: "kilometers" },
                { text: "Millas", value: "miles" }
        ];


        vm.filtroMarca = {
            Mobil: false,
            Shell: false,
            Castrol: false,
            Valvoline: false,
            Chevron: false
        }


        vm.filtros = function () {
            $("#yesButton").unbind();
            $('#yesButton').click(function (e) {

                filtro = [];
                if (vm.selectedCategoria != '') {
                    filtro.push("CATEGORIA_1='" + vm.selectedCategoria + "'");
                }
                switch (vm.selected) {
                    case '7':
                        if (vm.filtroMarca.Mobil) {
                            filtro.push("MOBIL=1");
                        }
                        if (vm.filtroMarca.Shell) {
                            filtro.push("SHELL=1");
                        }
                        if (vm.filtroMarca.Castrol) {
                            filtro.push("CASTROL=1");
                        }
                        if (vm.filtroMarca.Valvoline) {
                            filtro.push("VALVOLINE =1");
                        }
                        if (vm.filtroMarca.Chevron) {
                            filtro.push("CHEVRON  =1");
                        }
                        break
                    case '11':
                        if (vm.filtroMarca.Mobil) {
                            filtro.push("TOM_Mobil=1");
                        }
                        if (vm.filtroMarca.Shell) {
                            filtro.push("TOM_Shell=1");
                        }
                        if (vm.filtroMarca.Castrol) {
                            filtro.push("TOM_Castrol=1");
                        }
                        if (vm.filtroMarca.Valvoline) {
                            filtro.push("TOM_Valvoline =1");
                        }
                        if (vm.filtroMarca.Chevron) {
                            filtro.push("TOM_Chevron  =1");
                        }
                        break;
                    default:

                }
                if (filtro.length == 0) {
                    filtro = '1=1';
                }
                scope.query(filtro, function (error, result) {
                    vm.window.close();
                });

            });
            $("#noButton").unbind();
            $('#noButton').click(function (e) {
                vm.window.close();
            });
            $("#limpiarFilter").unbind();
            $('#limpiarFilter').click(function (e) {
                scope.query("1=1", function (error, result) {
                    vm.window.close();
                });

            });
            vm.window.open().center();
        };

        vm.buffer = function () {

            if (scope.buffered) {
                scope.buffered = false;
            }
            else {
                scope.buffered = true;
            }
            $("#yesBuffer").unbind();
            $('#yesBuffer').click(function (e) {
                scope.buffer(scope.bufferValue, scope.selectedUnidades);
                scope.winBuffer.close();
            });
            $("#cancelBuffer").unbind();
            $('#cancelBuffer').click(function (e) {
                scope.winBuffer.close();
            });

            //vm.winBuffer.open().center();

        };
        vm.bufferReporte = function () {

            //debugger;
            $("#pivotgrid").remove();
            $("#ContentPivot").append("<div id='pivotgrid'></div>")

            $("#configurator").remove();
            $("#ContentConfig").append("<div id='configurator'></div>")

            vm.winPivot.open().center();
            utilityService.geoJsonToPivot(scope.inside.features, function (error, response) {
                
                var pivotgrid = $("#pivotgrid").kendoPivotGrid({
                    columnWidth: 120,
                    height: 700,
                    dataSource: {
                        data: response,
                        schema: {
                            model: {
                                fields: {
                                    Nombre: { type: "string" },
                                    Categoria: { type: "string" },
                                    Provincia: { type: "string" },
                                    Distrito: { type: "string" },
                                    Corregimiento: { type: "string" },
                                    Barrio: { type: "string" },
                                    Tipo: { type: "string" },
                                    Mobil: { type: "number" },
                                    Shell: { type: "number" },
                                    Chevron: { type: "number" },
                                    Castrol: { type: "number" },
                                    Valvoline: { type: "number" },
                                    TOM_Movil: { type: "number" },
                                    TOM_Shell: { type: "number" },
                                    TOM_Chevron: { type: "number" },
                                    TOM_Castrol: { type: "number" },
                                    TOM_Valvoline: { type: "number" }
                                }
                            },
                            cube: {
                                dimensions: {
                                    Nombre: { caption: "PDVs" },
                                    Categoria: { caption: "Categorias" },
                                    Provincia: { caption: "Provincias" },
                                    Distrito: { caption: "Distrito" },
                                    Corregimiento: { caption: "Corregimiento" },
                                    Barrio: { caption: "Barrio" },
                                    Tipo: { caption: "Tipo" },                                    
                                    Mobil: { caption: "Mobil" },
                                    Shell: { caption: "Shell" },
                                    Chevron: { caption: "Chevron" },
                                    Castrol: {caption: "Castrol"},
                                    Valvoline: { caption: "Valvoline" },
                                    TOM_Movil: { caption: "TOM_Movil" },
                                    TOM_Shell: { caption: "TOM_Shell" },
                                    TOM_Chevron: { caption: "TOM_Chevron" },
                                    TOM_Castrol: { caption: "TOM_Castrol" },
                                    TOM_Valvoline: { caption: "TOM_Valvoline" }
                                },
                                measures: {
                                    "Disp_Mobil": { field: "Mobil", format: "{0}", aggregate: "sum" },
                                    "Disp_Shell": { field: "Shell", format: "{0}", aggregate: "sum" },
                                    "Disp_Chevron": { field: "Chevron", format: "{0}", aggregate: "sum" },
                                    "Disp_Castrol": { field: "Castrol", format: "{0}", aggregate: "sum" },
                                    "Disp_Valvoline": { field: "Valvoline", format: "{0}", aggregate: "sum" },
                                    "TOM_Movil": { field: "TOM_Movil", format: "{0}", aggregate: "sum" },
                                    "TOM_Shell": { field: "TOM_Shell", format: "{0}", aggregate: "sum" },
                                    "TOM_Chevron": { field: "TOM_Chevron", format: "{0}", aggregate: "sum" },
                                    "TOM_Castrol": { field: "TOM_Castrol", format: "{0}", aggregate: "sum" },
                                    "TOM_Valvoline": { field: "TOM_Valvoline", format: "{0}", aggregate: "sum" }
                                }
                            }
                        },
                        columns: [{ name: "Provincia", expand: true }],
                        rows: [{ name: "Categoria", expand: true }],
                        measures: ["Disp_Mobil"]
                    }
                }).data("kendoPivotGrid");
                $("#configurator").kendoPivotConfigurator({
                    dataSource: pivotgrid.dataSource,
                    height: 570
                });

            });


        };
        vm.toolbarOptions = {
            items: [
                { type: "button", text: "Filtros", click: vm.filtros },
                { type: "button", text: "Analisis" },
                { type: "button", text: "Buffer", togglable: true, toggle: vm.buffer },
                { type: "button", text: "Reportes Buffer", click: vm.bufferReporte }
            ]
        };


    }]);