require 'rubygems'
require 'sinatra'

get '/' do
  erb :index
end

get '/talks/:name' do
  File.read(File.join('public', 'talks', params[:name], 'index.html'))
end
