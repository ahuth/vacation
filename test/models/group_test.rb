require 'test_helper'

class GroupTest < ActiveSupport::TestCase
  setup do
    @group = groups(:one)
  end

  test "should indicate user" do
    assert @group.has_user?(users(:one))
    assert_not @group.has_user?(users(:two))
  end
end
