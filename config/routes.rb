SampleApp::Application.routes.draw do
  
  get "samples/pretty_template", to: "samples#pretty_template"
  resources :samples
  root to: "samples#index"


end
