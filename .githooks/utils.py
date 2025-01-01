import sys
import subprocess
import platform
import shutil


def notify_windows(title, message):
    script = f"""
    [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] > $null
    $template = [Windows.UI.Notifications.ToastNotificationManager]::GetTemplateContent([Windows.UI.Notifications.ToastTemplateType]::ToastText02)
    $toastXml = [xml] $template.GetXml()
    $toastTextElements = $toastXml.GetElementsByTagName("text")
    $toastTextElements[0].AppendChild($toastXml.CreateTextNode("{title}"))
    $toastTextElements[1].AppendChild($toastXml.CreateTextNode("{message}"))
    $xml = New-Object Windows.Data.Xml.Dom.XmlDocument
    $xml.LoadXml($toastXml.OuterXml)
    $toast = [Windows.UI.Notifications.ToastNotification]::new($xml)
    $toastNotifier = [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier("Python")
    $toastNotifier.Show($toast)
    """
    subprocess.run(["powershell", "-Command", script], shell=True)


def notify_macos(title, message):
    script = f'display notification "{message}" with title "{title}"'
    subprocess.run(["osascript", "-e", script], shell=True)


def notify_linux(title, message):
    subprocess.run(["notify-send", title, message], shell=True)


def notify(title, message):
    os_name = platform.system()
    if os_name == "Windows":
        notify_windows(title, message)
    elif os_name == "Darwin":
        notify_macos(title, message)
    elif os_name == "Linux":
        notify_linux(title, message)
    else:
        print("Unsupported OS for notifications")
