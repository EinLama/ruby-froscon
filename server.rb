require 'rubygems'
require 'sinatra'

get '/' do
  @show_main_nav = true
  erb :index
end

get '/history/2013' do
  erb "2013".to_sym
end

get '/talks/:name' do
  File.read(File.join('public', 'talks', params[:name], 'index.html'))
end
