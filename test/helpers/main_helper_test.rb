require 'test_helper'

class MainHelperTest < ActionView::TestCase
  attr_reader :request

  setup do
    @link_path = "/path"
    @link_text = "Link"
  end

  test "should render a list item and link if not on current path" do
    html = "<li><a href=\"#{@link_path}\">#{@link_text}</a></li>"
    assert_equal html, nav_link(@link_text, @link_path)
  end

  test "should add a class if on the link path" do
    request.path = @link_path

    html = "<li class=\"active\"><a href=\"#{@link_path}\">#{@link_text}</a></li>"
    assert_equal html, nav_link(@link_text, @link_path)
  end
end
