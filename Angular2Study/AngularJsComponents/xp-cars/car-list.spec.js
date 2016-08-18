
describe('The carList component', function(){

    beforeEach(module('xpCars'));

    var carsList;
    beforeEach(inject(function($componentController){
        carsList = $componentController('carsList', {
            $scope:{}
        });

    }));

    it('can be created', function(){
        expect(carsList).toBeDefined();
        expect(carsList.$onInit).toBeDefined();
    })
});cls