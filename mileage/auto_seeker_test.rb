require "minitest/autorun"
require "./auto_seeker"

describe AutoSeeker do
  before do
    data = [
      [1,'Red',12999,20.0,'gas'],
      [2,'Blue',13999,25.0,'gas'],
      [3,'Teal',19000,27.0,'gas'],
      [4,'Red',14999,40.0,'diesel'],
      [5,'Teal',nil,nil,'diesel']
    ]
    @seeker = AutoSeeker.new data
  end


  describe "#filter " do
    it "can filter by color " do
      @seeker.filter 'color', 'Red'
      @seeker.autos.collect(&:color).uniq.must_equal ['Red']
    end

    it "can filter by fuel type " do
      @seeker.filter 'fuel', 'gas'
      @seeker.autos.collect(&:fuel).uniq.must_equal ['gas']
    end
  end

  describe "#filter_by_price_range " do
    it "can filter by price range" do
      @seeker.filter_by_price_range 13000, 15000
      @seeker.autos.each do |auto| 
        assert auto.price >= 13000
        assert auto.price <= 15000
      end
    end
  end

  describe ".median_mileage " do
    it "calculates median mileage for all autos" do
      AutoSeeker.median_mileage(@seeker.autos).must_equal 26.0
    end
  end
end
