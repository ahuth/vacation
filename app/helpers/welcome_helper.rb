module WelcomeHelper
  # Create a anchor nested under a list item. Any options are applied to the
  # anchor element.
  def nav_link(link_text, link_path, options={})
    class_name = current_page?(link_path) ? "active" : nil

    content_tag(:li, class: class_name) do
      link_to(link_text, link_path, options)
    end
  end
end
