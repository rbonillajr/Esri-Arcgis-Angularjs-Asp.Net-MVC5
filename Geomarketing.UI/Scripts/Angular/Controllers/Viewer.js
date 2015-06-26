angular.module('geomarketing')
    .controller('ViewerController', ['$scope', function (scope) {
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
           
            vm.winPivot.open().center();
        };
        vm.toolbarOptions = {
            items: [
                { type: "button", text: "Filtros", click: vm.filtros },
                { type: "button", text: "Analisis" },
                { type: "button", text: "Buffer", togglable: true, toggle: vm.buffer },
                { type: "button", text: "Reportes Buffer", click: vm.bufferReporte }
            ]
        };
        vm.dataSource = new kendo.data.PivotDataSource({
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Product].[Category]" }],
            rows: [{ name: "[Geography].[City]" }],
            measures: ["[Measures].[Reseller Freight Cost]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: "http://demos.telerik.com/olap/msmdpump.dll"
            },
            schema: {
                type: "xmla"
            },
            error: function (e) {
                alert("error: " + kendo.stringify(e.errors[0]));
            }
        });
        vm.options = {
            columnWidth: 200,
            height: 580,
            dataSource: vm.dataSource
        };

    }]);