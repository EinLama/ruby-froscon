require 'yaml'
require 'mustache'
require 'active_support/core_ext'

desc "Start a Puma server"
task :server do
  `bundle exec shotgun --host 0.0.0.0 --server puma server.rb`
end

## -- Misc Configs -- ##

public_dir      = "public"    # compiled site directory
deploy_dir      = "_deploy"   # deploy directory (for Github pages deployment)
repo_url        = "git@github.com:EinLama/ruby-froscon.git"
deploy_branch   = "gh-pages"

##############
# Deploying  #
##############

desc "deploy public directory to github pages"
multitask :deploy do
  puts "## Deploying branch to Github Pages "
  (Dir["#{deploy_dir}/*"]).each { |f| rm_rf(f) }
  puts "\n## copying #{public_dir} to #{deploy_dir}"
  cp_r "#{public_dir}/.", deploy_dir
  cd "#{deploy_dir}" do
    system "git add ."
    system "git add -u"
    puts "\n## Commiting: Site updated at #{Time.now.utc}"
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m \"#{message}\""
    puts "\n## Pushing generated #{deploy_dir} website"
    system "git push origin #{deploy_branch} --force"
    puts "\n## Github Pages deploy complete"
  end
end

desc "Set up _deploy folder and deploy branch for Github Pages deployment"
task :setup_github_pages do
  user = repo_url.match(/:([^\/]+)/)[1]
  branch = (repo_url.match(/\/[\w-]+.github.com/).nil?) ? 'gh-pages' : 'master'
  project = (branch == 'gh-pages') ? repo_url.match(/\/([^\.]+)/)[1] : ''
  url = "http://#{user}.github.com"
  url += "/#{project}" unless project == ''
  rm_rf deploy_dir
  mkdir deploy_dir
  cd "#{deploy_dir}" do
    system "git init"
    system "echo 'Coming soon...' > index.html"
    system "git add ."
    system "git commit -m \"Intial commit\""
    system "git branch -m gh-pages" unless branch == 'master'
    system "git remote add origin #{repo_url}"
  end
  puts "\n---\n## Now you can deploy to #{url} with `rake deploy` ##"
end

task :default => [:server]

class TalkView < Mustache
  self.template_file = './talks/view.html.mustache'

  def initialize(talk)
    talk.each do |attr, val|
      self[attr.to_sym] = val
    end
  end

  def pics
    [self[:pic]].flatten.map { |pic| { pic_url: pic }  }
  end

end

desc "Generate talk detail pages"
task :talks do
  mkdir_p "public/talks"

  Dir["talks/*.yml"].each do |talk_yml|
    talk = YAML.load(open(talk_yml))
    view = TalkView.new(talk)
    path = File.join("public", "talks", talk['title'].parameterize)
    mkdir_p path
    File.open(File.join(path, "index.html"), "w+") { |f| f.puts view.render }
  end
end
