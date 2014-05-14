require 'rubygems'
require 'sinatra'

def main_page
  @show_main_nav = true
  erb :index
end

get '/' do
  main_page
end
get '/index.html' do
  main_page
end

get '/2013.html' do
  erb "2013".to_sym
end

get '/talks/:name' do
  File.read(File.join('public', 'talks', params[:name], 'index.html'))
end
