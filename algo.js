//Ported by Andre Salmeri and Adrien Maranville


    //This wont work for now. All Body and Database Requests need to be exchanged.

module.exports = {
        calculateProductionOrder: function (p) {
            console.log("ALGO: " + p[0].ssA0);
            var ssA0 = p[0].ssA0, ssB0 = p[0].ssB0, ssC0 = p[0].ssC0, ssD0 = p[0].ssD0, ssD1 = p[0].ssD1, ssE0 = p[0].ssE0, ssE1 = p[0].ssE1, ssE2 = p[0].ssE2;
            var lsA0 = p[0].lsA0, lsB0 = p[0].lsB0, lsC0 = p[0].lsC0, lsD0 = p[0].lsD0, lsD1 = p[0].lsD1, lsE0 = p[0].lsE0, lsE1 = p[0].lsE1, lsE2 = p[0].lsE2;
            var ltA0 = p[0].ltA0, ltB0 = p[0].ltB0, ltC0 = p[0].ltC0, ltD0 = p[0].ltD0, ltD1 = p[0].ltD1, ltE0 = p[0].ltE0, ltE1 = p[0].ltE1, ltE2 = p[0].ltE2;

            let dummy = [[ssE0, lsE0, ltE0], [ssE1, lsE1, ltE1], [ssE2, lsE2, ltE2], [ssD0, lsD0, ltD0], [ssD1, lsD1, ltD1], [ssC0, lsC0, ltC0], [ssB0, lsB0, ltB0], [ssA0, lsA0, ltA0]];
            //Those are the ones from the Data-Chart where you can alter the parameters. :)
            var MRP_Planning_Parameters = dummy;
            //console.log(req.body);

            var CO = [[1, 191, 2], [0, 214, 1], [0, 227, 1], [1, 242, 2], [2, 282, 1], [0, 313, 1], [1, 314, 2], [1, 337, 2], [0, 349, 1], [1, 363, 2], [0, 390, 1], [0, 435, 1], [1, 443, 2], [0, 452, 1], [1, 476, 2], [1, 496, 2], [0, 533, 1], [1, 567, 2], [0, 569, 1], [1, 602, 2], [0, 624, 1], [2, 630, 1], [1, 632, 2], [0, 641, 1], [1, 712, 2], [0, 715, 1], [1, 729, 2], [2, 765, 1], [0, 792, 1], [1, 794, 2], [1, 815, 2], [0, 826, 1], [1, 838, 2], [0, 862, 1], [0, 903, 1], [1, 910, 2], [0, 919, 1], [1, 942, 2], [1, 963, 2], [0, 1000, 1], [1, 1034, 2], [0, 1036, 1], [1, 1070, 2], [0, 1092, 1], [2, 1098, 1], [1, 1099, 2], [0, 1109, 1], [1, 1154, 2], [0, 1158, 1], [1, 1193, 2], [0, 1216, 1], [0, 1229, 1], [1, 1244, 2], [2, 1284, 1], [0, 1315, 1], [1, 1316, 2], [1, 1339, 2], [0, 1351, 1], [1, 1365, 2], [0, 1392, 1], [0, 1437, 1], [1, 1445, 2], [0, 1454, 1], [1, 1478, 2], [1, 1498, 2], [0, 1535, 1], [1, 1569, 2], [0, 1571, 1], [1, 1604, 2], [0, 1626, 1], [2, 1632, 1], [1, 1632, 2], [0, 1643, 1], [1, 1714, 2], [0, 1717, 1], [1, 1731, 2], [2, 1767, 1], [0, 1794, 1], [1, 1796, 2], [1, 1817, 2], [0, 1828, 1], [1, 1840, 2], [0, 1864, 1], [0, 1905, 1], [1, 1912, 2], [0, 1921, 1], [1, 1944, 2], [1, 1965, 2], [0, 2002, 1], [1, 2036, 2], [0, 2038, 1], [1, 2072, 2], [0, 2094, 1], [2, 2100, 1], [1, 2101, 2], [0, 2111, 1], [1, 2156, 2]];
            var GR, SR, Inventory, NR, InventoryLotsizeCalculation, PO_rec, PO_rel;
            var planning_horizon = 2201;
            var numberofmaterials = 8;
            var Materials = ["E0", "E1", "E2", "D0", "D1", "C0", "B0", "A0"];
            var Bom = [[0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0]];

            var productArray = [];
            var secondesArray = [];
            var quantityArray = [];
            var machineArray = [];

            var current_Materialnummer = "";
            var current_pos = 0;

            // vvvv-------------FUNCTIONS-------------vvvv
            var createArray = function (rows, cols, defaultValue) {
                var arr = [];
                for (var i = 0; i < rows; i++) {

                    // Creates an empty line
                    arr.push([]);

                    // Adds cols to the empty line:
                    arr[i].push(new Array(cols));

                    for (var j = 0; j < cols; j++) {
                        // Initializes:
                        arr[i][j] = defaultValue;
                    }
                }

                return arr;
            }

            var f_set_array_zero = function () {
                GR = createArray(numberofmaterials, planning_horizon, 0);
                SR = createArray(numberofmaterials, planning_horizon, 0);
                Inventory = createArray(numberofmaterials, planning_horizon, 0);
                NR = createArray(numberofmaterials, planning_horizon, 0);
                InventoryLotsizeCalculation = createArray(numberofmaterials, planning_horizon, 0);
                PO_rec = createArray(numberofmaterials, planning_horizon, 0);
                PO_rel = createArray(numberofmaterials, planning_horizon, 0);
            }

            var f_write_CO_in_GR_array = function () {
                for (var i = 0; i < CO.length; i++) {
                    GR[CO[i][0]][CO[i][1]] = CO[i][2];
                    //console.log(GR[CO[i][0]][CO[i][1]]); //this is good
                }
            }

            var f_netting = function (current_pos) {
                var safetystock = 0;
                safetystock = MRP_Planning_Parameters[current_pos][0]; //this is good too
                for (var i = 1; i < planning_horizon; i++) {

                    NR[current_pos][i] = Math.max(GR[current_pos][i] - Inventory[current_pos][i - 1] + safetystock, 0); //this is not good.....
                    //console.log(NR[current_pos][i]);
                    Inventory[current_pos][i] = Math.max(Inventory[current_pos][i - 1] - GR[current_pos][i], safetystock);
                }
            }

            var f_lotsize_FOQ = function (Losgroessenparameter, Differenzbedarf) {

                var x = 0;
                x = Math.ceil((Differenzbedarf / Losgroessenparameter)) * Losgroessenparameter;
                return x;
            }

            var f_lotsizing = function (current_pos) {
                var fertig_gestellte_planauftraege_value = 0;
                var nettobedarf2 = 0;
                for (var i = 1; i < planning_horizon; i++) {
                    //console.log(NR[current_pos][i]);
                    nettobedarf2 = NR[current_pos][i] - InventoryLotsizeCalculation[current_pos][i - 1];
                    if (nettobedarf2 > 0) {
                        fertig_gestellte_planauftraege_value = f_lotsize_FOQ(MRP_Planning_Parameters[current_pos][1], nettobedarf2);
                        PO_rec[current_pos][i] = fertig_gestellte_planauftraege_value;
                        fertig_gestellte_planauftraege_value = 0;
                    } else {
                        PO_rec[current_pos][i] = 0;
                    }
                    InventoryLotsizeCalculation[current_pos][i] = InventoryLotsizeCalculation[current_pos][i - 1] - NR[current_pos][i] + PO_rec[current_pos][i];
                }
            }

            var f_backwardscheduling = function (current_pos, time) {
                var p = 0;
                for (var i = 1; i < planning_horizon; i++) {
                    if (i - MRP_Planning_Parameters[current_pos][2] > 0) {
                        p = i - MRP_Planning_Parameters[current_pos][2];
                    } else {
                        if (time > 1) {
                            p = 1;
                        } else {
                            p = 0;
                        }
                    }
                    PO_rel[current_pos][p] += PO_rec[current_pos][i];
                }
            }

            var f_bomexplosion = function (current_pos) {
                var pos_submaterial = 0;
                var j = 0;
                if (current_pos >= 0) {
                    for (var x = 0; x < Bom[current_pos].length; x++) {
                        pos_submaterial = x;
                        if (Bom[current_pos][x] > 0) {
                            for (j = 1; j < planning_horizon; j++) {
                                GR[pos_submaterial][j] += PO_rel[current_pos][j] * Bom[current_pos][x];
                            }
                        }
                    }
                }
            }

            var f_WriteProductionOrderstoConsole = function () {
                console.log("Material    Timeperiod    Quantity");
                for (var j = 1; j < planning_horizon; j++) {
                    for (var i = 0; i < numberofmaterials; i++) {
                        if (PO_rel[i][j] > 0) {
                            secondesArray.push(j);
                            quantityArray.push(PO_rel[i][j]);
                            productArray.push(Materials[i]);
                            var str = Materials[i].split('');
                            if (str[0] == "A")
                                machineArray.push("machine1");
                            if (str[0] == "B")
                                machineArray.push("machine2");
                            if (str[0] == "C")
                                machineArray.push("machine3");
                            if (str[0] == "D")
                                machineArray.push("machine4");
                            if (str[0] == "E")
                                machineArray.push("machine5");
                        }
                    }
                }
            }

            // ATTENTION! -- DB connection for specific data!
            var f_push_to_db = function (products, seconds, quantity, machines) {
                //var db = req.db;

                var orderlist_collection = {};//db.get('orderlist_collection');
                var inventory_collection = {};//db.get('inventory_collection');
                //inventory_collection.remove({});
                //orderlist_collection.remove({});
                var data = [];
                for (i = 0; i < products.length; i++) {
                    data.push({
                        "orderID": i.toString(),
                        "time": seconds[i].toString(),
                        "product": products[i],
                        "machine": machines[i],
                        "amount": quantity[i].toString()
                    });
                }
                //orderlist_collection.insert(data);
                var sendinventory =
                    {
                        "E0": (PO_rel[0][0]),//.toString(),
                        "E1": (PO_rel[1][0]),//.toString(),
                        "E2": (PO_rel[2][0]),//.toString(),
                        "D0": (PO_rel[3][0]),//.toString(),
                        "D1": (PO_rel[4][0]),//.toString(),
                        "C0": (PO_rel[5][0]),//.toString(),
                        "B0": (PO_rel[6][0]),//.toString(),
                        "A0": (PO_rel[7][0]),//.toString()
                    };

                //console.log(output);
                //HTTP Response! We may need to exchange this to be something like
                // return inventory_List or something
                //res.send(sendinventory);
                //console.log("Notice me: "+ JSON.stringify(sendinventory));
                /*
                inventory_collection.insert([
                    {
                        "E0": (PO_rel[0][0]).toString(),
                        "E1": (PO_rel[1][0]).toString(),
                        "E2": (PO_rel[2][0]).toString(),
                        "D0": (PO_rel[3][0]).toString(),
                        "D1": (PO_rel[4][0]).toString(),
                        "C0": (PO_rel[5][0]).toString(),
                        "B0": (PO_rel[6][0]).toString(),
                        "A0": (PO_rel[7][0]).toString()
                    }]);
                */
                return {preproduction: sendinventory, orderlist: data};
            }

            // ^^^^-------------FUNCTIONS-------------^^^^

            f_set_array_zero();
            f_write_CO_in_GR_array();

            for (var i = 0; i < numberofmaterials; i++) {
                current_Materialnummer = Materials[i];
                f_netting(i);
                f_lotsizing(i);
                f_backwardscheduling(i, 0);
                f_bomexplosion(i);
            }

            f_WriteProductionOrderstoConsole();
            var data = f_push_to_db(productArray, secondesArray, quantityArray, machineArray);
            //console.log("MRP CALCULATION DONE! ENJOY...");
            return data;

        }
    }