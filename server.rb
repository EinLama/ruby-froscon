require 'rubygems'
require 'sinatra'

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/talks/:name' do
  File.read(File.join('public', 'talks', params[:name], 'index.html'))
end
