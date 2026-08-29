# Quy trình version control và xuất bản Notion

## Nguồn chuẩn

Repository Git là nguồn chuẩn duy nhất. Notion là bản trình bày để đọc, nhận xét và duyệt.

Chiều đồng bộ được phép:

```text
branch Git -> pull request/diff -> main -> Notion
```

Không tự động đồng bộ ngược từ Notion về Git vì chuyển đổi block/Markdown và thay đổi đồng thời có thể gây mất nội dung hoặc ghi đè.

## Một thay đổi thông thường

```bash
git switch main
git pull --ff-only
git switch -c chapter-02/revise-coordinate-frames

# sửa nội dung và chạy kiểm tra

git add chapters/02-coordinate-frames.md assets/chapter-02
git commit -m "Revise Chapter 2 coordinate-frame explanation"
git push -u origin chapter-02/revise-coordinate-frames
```

Sau khi xem diff và duyệt, merge branch vào `main`. Bản Notion chỉ được cập nhật từ commit đã merge.

## Quy ước branch

- `chapter-NN/<muc-dich>`: viết hoặc sửa một chương.
- `docs/<muc-dich>`: kiến trúc, source map hoặc hướng dẫn.
- `assets/<muc-dich>`: hình minh họa.
- `fix/<muc-dich>`: sửa lỗi nhỏ đã xác định.

## Quy ước commit

Commit message dùng động từ ngắn và nói rõ phạm vi, ví dụ:

- `Add Chapter 3 transform lab`
- `Fix Chapter 1 mislabeled-keypoint example`
- `Update source map for camera geometry`

## Trước khi merge

- Kiểm tra đường dẫn hình không bị hỏng.
- Chạy mã và test được chương nhắc tới.
- Phân biệt rõ kết quả đã kiểm chứng và nội dung chưa được kiểm thử.
- Kiểm tra thuật ngữ đã được giải thích trước khi sử dụng.
- Đối chiếu yêu cầu tương ứng trong `docs/source-map.md`.
- Xem diff để tránh thay đổi ngoài phạm vi.

## Xuất sang Notion

Tệp đích được khai báo trong `docs/notion-pages.yml`. Khi xuất bản:

1. đọc tệp Markdown ở commit `main`;
2. cập nhật đúng trang Notion đã ánh xạ;
3. tải ảnh cục bộ lên Notion thay vì dùng URL tạm thời;
4. kiểm tra tiêu đề, code block, bảng, công thức và ảnh;
5. ghi commit SHA đã xuất vào phần metadata/trạng thái xuất bản.

Kết nối GitHub của Notion không thực hiện luồng này; nó chỉ đưa issue và pull request vào Notion. Việc xuất nội dung phải do một script/API hoặc tác nhân đã được cấp quyền cho cả GitHub và Notion thực hiện.

