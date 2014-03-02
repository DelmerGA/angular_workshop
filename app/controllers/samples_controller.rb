class SamplesController < ApplicationController
  def index

  	@samples = [{name: "flying fish", description: "fly high"},
  				{name: "bear", description: "hairy"}]
  	respond_to do |f|
  		f.html
  		f.json {render json: @samples}
  	end
  end

  def pretty_template
  	render layout: false
  end
end
